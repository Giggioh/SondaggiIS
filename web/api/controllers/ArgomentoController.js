/**
 * ArgomentoController
 *
 * @description :: Server-side logic for managing argomentoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  create:function (req,res,next) {
    Argomento.create(req.allParams()).exec(function (err,argomento) {
      if(err) next(err);
      res.redirect('/Argomento/argomentoCreato?id='+argomento.id);
    });
  },

  'argomentoCreato':function (req,res,next) {
    Argomento.findOne(req.param('id')).exec(function (err,argomento) {
      if(err) next(err);
      res.view({Argomento:argomento});
    });
  }
};

