/**
 * SondaggioController
 *
 * @description :: Server-side logic for managing sondaggios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  index:function (req,res) {
    if (GlobalService.isProd()) return res.forbidden();
    Sondaggio.find().populate("amministratoreContenuti").populate("argomenti").populate("risposteDate").exec(function (err, sond) {
      res.json(sond);
    });
  },

  'new':function (req, res) {
    if(!Account.isAmministratoreContenuti(req)) return res.forbidden();
    res.view();
  },

  create: function (req, res, next) {
    var nome = req.param("nome");
    if(nome == null) res.redirect('/Sondaggio/new');
    if(!Account.isAmministratoreContenuti(req)) return res.forbidden();
    var acc = Account.getCurrentUser(req);
    Sondaggio.create({nome: nome, bozza:true, amministratoreContenuti: acc.amministratoreContenuti[0].id}).exec(function (err, sondaggio) {
      if(err) next(err);
      res.redirect('/Sondaggio/sondaggioCreato?id='+sondaggio.id);
    });
  },

  sondaggioCreato:function (req,res,next) {
    Sondaggio.findOne(req.param('id')).exec(function (err,sondaggio) {
      if(err) next(err);
      res.view({Sondaggio:sondaggio});
    });
  },

  riepilogo:function (req,res,next) {
    if(!Account.isAmministratoreContenuti(req)) return res.forbidden();

    Sondaggio.findOnePop({id:req.param('id')},function(err,sond) {
      if (err) next(err);
      res.view({sondaggio: sond});
    });
  },

  listaUtente:function(req,res,next) {
    if (!Account.isUtente(req)) return res.forbidden(); //TODO: filtra solo quelli per cui è eligible
    var acc = Account.getCurrentUser(req);
    //TODO: possibilità di filtrarli tramite parametri
    RispostaData.findPop({utente:acc.utente[0].id},function(err,risposteUtente) {
      var listaSondaggiCompletati = [];
      for (let ru of risposteUtente) {
        if (!listaSondaggiCompletati.includes(ru.domanda.argomento.sondaggio.id))
          listaSondaggiCompletati.push(ru.domanda.argomento.sondaggio.id);
      }

      Sondaggio.findPop({bozza:false, id: {'!=':listaSondaggiCompletati}}, function (err, sondaggi) {
        if (sondaggi == null) next(err);
        res.view({list:sondaggi});
      });
    });
  },

  listaAC:function(req,res,next) {
    if(!Account.isAmministratoreContenuti(req)) return res.forbidden();
    var acc = Account.getCurrentUser(req);

    //TODO: possibilità di filtrarli tramite parametri
    Sondaggio.findPop({amministratoreContenuti: acc.amministratoreContenuti[0].id},function(err,list) { //TODO: filtra via le bozze
      if (list == null) next(err);
      res.view({list: list});
    });
  },

  //TODO: non fa nulla, fixalo
  pubblicaSondaggio:function (req,res,next) {
    if(!Account.isAmministratoreContenuti(req)) return res.forbidden();

    Sondaggio.update({id:req.param('id')}).set({bozza:false,dataPubblicazione:new Date()}).exec(function (err, sond) {
      if(err) next(err);
      res.redirect("/Sondaggio/listaAC");
    });
  },

  compilazione:function (req,res,next) {
    if(!Account.isUtente(req)) return res.forbidden();

    Sondaggio.findOnePop({id:req.param('id')},function (err, sond) {
      if(err) next(err);
      res.view({sondaggio:sond});
    });
  },

  salvaRisposte:function (req,res,next) {
    if(!Account.isUtente(req)) return res.forbidden();
    var acc = Account.getCurrentUser(req);

    Sondaggio.findOnePop({id:req.param('id')},function (err, sond) {
      if(err) next(err);
      //Organizzo i parametri di risposte date
      var risposte=[];
      for(var a=0;a<sond.argomenti.length;a++) {
        for(var d=0;d<sond.argomenti[a].domande.length;d++) {
          var risp=req.param("risposta"+a+"_"+d);
          if (!risp) next(new Error('Risposta non presente.'));

          //Confronto che l'id di risposta che abbiamo sia giusto per la domanda in questione
          var rispostaValida=false;
          console.log(risp);
          for(var r=0;r<sond.argomenti[a].domande[d].risposte.length;r++) {
            console.log(sond.argomenti[a].domande[d].risposte[r].id);
            if (sond.argomenti[a].domande[d].risposte[r].id==risp) rispostaValida=true;
          }
          if (!rispostaValida) next(new Error('Risposta non valida.'));

          risposte.push({domanda:sond.argomenti[a].domande[d].id,risposta:parseInt(risp)});
        }
      }

      sails.getDatastore().transaction(async function(db,proceed) {
        for(var rr=0;rr<risposte.length;rr++) {
          try {
            await RispostaData.create({
              domanda: risposte[rr].domanda,
              risposta: risposte[rr].risposta,
              utente: acc.utente[0].id,
              dataCompilazione: new Date()
            }).usingConnection(db);
          } catch(err) { return proceed(err); }
        }
        return proceed();
      }).exec(function(err) {
        if (err) next(err);
        res.redirect("/Sondaggio/listaUtente"); //TODO: maybe schermata successo compilazione?
      });
    });
  },
}

