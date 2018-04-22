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
    //if(!Account.isAmministratoreContenuti(req)) return res.forbidden();
    res.view();
  },

  create: function (req, res, next) {
    var nome = req.param("nome");
    //if(nome==null || !Account.isAmministratoreContenuti(req)) return res.forbidden();
    //var acc = Account.getCurrentUser(req);
    Sondaggio.create({nome: nome, bozza:true /**amministratoreContenuti: acc.amministratoreContenuti.id*/}).exec(function (err, sondaggio) {
      if(err) next(err);
      res.redirect('/Sondaggio/sondaggioCreato?id='+sondaggio.id);
    });
  },

  'sondaggioCreato':function (req,res,next) {
    Sondaggio.findOne(req.param('id')).exec(function (err,sondaggio) {
      if(err) next(err);
      res.view({Sondaggio:sondaggio});
    });
  },

  //TODO:COME IMPLEMENTARE POPULATE ANNIDATI? IL PROBLEMA STA NEL POPOLARE GLI ARGOMENTI E LE RELATIVE DOMANDE
  'riepilogo':function (req,res,next) {
    var domande = [];
    var risposte = [];
    Sondaggio.findOne(req.param('id')).populate('argomenti').exec(function (err,sond) {
        //if(err) next(err);
        /**Argomento.forEach(sond.argomenti, function (arg) {
         Domanda.forEach(arg.domande, function (dom) {
           domande.add(dom).populate('argomento');
           Risposta.forEach(dom.risposte, function (ris) {
             risposte.add((ris)).populate('domanda');
           })
         })
        })*/
        if(sond == null) res.send("il sondaggio è null e l'id non trovato è:"+req.param('idRiepSondaggio'));
      res.view({sondaggio:sond, Domande:domande, Risposte:risposte});
    });
  }
}

