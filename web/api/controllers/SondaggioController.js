/**
 * SondaggioController
 *
 * @description :: Server-side logic for managing sondaggios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  'new' :function (req, res) {
    res.view();
  },

  create: function (req, res, next) {
    var nome = req.param("nome");
    Sondaggio.create({nome: nome, bozza:true}).exec(function (err, sondaggio) { //TODO: deve essere direttamente linkato all'utente loggato
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

  'riepilogo':function (req,res,next) {
    Sondaggio.findOne(req.param('idRiepSondaggio')).exec(function (err, sond)
    {
      if(err) next(err);
      Argomento.find({where:{sondaggio:sond.id}, sort : id}).populate('sondaggio').exec(function (err,argomenti)
      {
        if(err) next(err);
        forEach(argomenti, function (arg)
        {
          Domanda.find({where:{argomento:arg.id}, sort:id}).populate('argomento').exec(function (err,domande) {
            if(err) next(err);
            forEach(domande, function (dom)
            {
              Risposta.find({where: {domanda: dom.id}, sort: id}).populate('domanda').exec(function (err, risposte) {
                if (err) next(err);
                res.view({Sondaggio: sond});
              });
            });
          });
        });
      });
    });
  }
};

