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
    Sondaggio.findOnePop({id:req.param('id')},function(err,sond) {
      if (err) next(err);
      res.view({sondaggio: sond});
    });
  },

  listaUtente:function(req,res,next) {
    if (!Account.isUtente(req)) return res.forbidden(); //TODO: filtra solo quelli per cui è eligible
    //var acc = Account.getCurrentUser(req);

    //TODO: possibilità di filtrarli tramite parametri
    Sondaggio.findPop({}, function (err, sondaggi) { //TODO: filtra via le bozze
      if (sondaggi == null) next(err);

      res.view({list: sondaggi});
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
    Sondaggio.update({id:req.param('id')}).set({bozza:false}).exec(function (sond, err) {
      if(err) next(err);
      res.redirect("/Sondaggio/listaAC");
    })
  },

  compilazione:function (req,res,next) {
    Sondaggio.findOnePop({id:req.param('idSond')},function (err, sond) {
      if(err) next(err);
      res.view({sondaggio:sond});
    })
  },
}

