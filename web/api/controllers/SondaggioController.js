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
      res.view({sondaggio:sondaggio});
    });
  }
};

