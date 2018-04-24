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
    //if(nome==null || !Account.isAmministratoreContenuti(req)) return res.forbidden();
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

  //TODO:COME IMPLEMENTARE POPULATE ANNIDATI? IL PROBLEMA STA NEL POPOLARE GLI ARGOMENTI E LE RELATIVE DOMANDE
  riepilogo:function (req,res,next) {
    /*Sondaggio.findOne(req.param('id')).populate('argomenti').exec(async function (err, sond) {
      if (sond == null) next(err);

      var argNuovi = [];
      for (let arg of sond.argomenti) {
          var dd;
          await Domanda.find({argomento: arg.id}).populate('risposte').then(function (domande) {
            dd = domande;
          });
          arg.domande = dd;
          argNuovi.push(arg);
      }
      sond.argomenti = argNuovi;
      res.json(sond);
    });*/
    Sondaggio.getById(req.param('id'),function(err,sond) {
      if (err) next(err);
      res.view({sondaggio: sond});
    });
  },

  listaUtente:function(req,res,next) {
    if(!Account.isUtente(req)) return res.forbidden(); //TODO: filtra solo quelli per cui è eligible
    //var acc = Account.getCurrentUser(req);
    var nestedPop = require('nested-pop');
    //TODO: possibilità di filtrarli tramite parametri
    Sondaggio.find(/*{bozza: false}*/).populate("amministratoreContenuti").exec(function(err,list) { //TODO: filtra via le bozze
      if (list == null) next(err);

      nestedPop(list, {amministratoreContenuti:['account']}).then(function(sondaggi) {
        res.view({list:sondaggi});
      });
    });
  },

  listaAC:function(req,res,next) {
    if(!Account.isAmministratoreContenuti(req)) return res.forbidden();
    var acc = Account.getCurrentUser(req);

    //TODO: possibilità di filtrarli tramite parametri
    Sondaggio.find({amministratoreContenuti: acc.amministratoreContenuti[0].id}).populate("amministratoreContenuti").exec(function(err,list) { //TODO: filtra via le bozze
      if (list == null) next(err);

      res.view({list: list});
    });
  }
}

