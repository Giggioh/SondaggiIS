/**
 * ArgomentoController
 *
 * @description :: Server-side logic for managing argomentoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  index:function (req,res) {
    if (GlobalService.isProd()) return res.forbidden();
    Argomento.find().populate("sondaggio").populate("domande").exec(function (err, args) {
      res.json(args);
    });
  },

  create:function (req,res,next) {
    if(!Account.isAmministratoreContenuti(req)) return res.forbidden();
    Argomento.create(req.allParams()).exec(function (err,argomento) {
      if(err) next(err);
      res.redirect('/Argomento/argomentoCreato?id='+argomento.id);
    });
  },

  'argomentoCreato':function (req,res,next) {
    Argomento.findOne(req.param('id')).populate('sondaggio').exec(function (err,argomento) {
      if(err) next(err);
      res.view({Argomento:argomento});
    });
  }
};

