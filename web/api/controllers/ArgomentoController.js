/**
 * ArgomentoController
 *
 * @description :: Server-side logic for managing argomentoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  'new':function (req,res) {
    Sondaggio.findOne(req.param('sondaggio')).exec(function (err,sondaggio) {
      if(err) next(err);
      res.view({Sondaggio:sondaggio});
    });
  },

  create:function (req,res,next) {
    Argomento.create(req.allParams()).exec(function (err,argomento) {
      if(err) next(err);
      res.json(argomento);
    });
  }
};

