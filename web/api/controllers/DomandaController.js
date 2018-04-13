/**
 * DomandaController
 *
 * @description :: Server-side logic for managing domandas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  create:function (req,res,next) {
    if(!Account.isAmministratoreContenuti(req)) return res.forbidden();
    Domanda.create({testo:req.param('testo'), argomento: req.param('argomento')}).exec(function (err,dom) {
      if(err) next(err);
      Risposta.create({testo: req.param('R1'), domanda: dom.id}).exec(function (err) {
        if (err) next(err);
      });
      Risposta.create({testo: req.param('R2'), domanda: dom.id}).exec(function (err) {
        if (err) next(err);
      });
      res.redirect("/Argomento/argomentoCreato?id="+req.param('argomento'));
    });
  },

  'modificaDomanda':function (req,res,next) {
    Domanda.update({id:req.param('domModificata')}).set({testo:req.param('txtDomanda')}).exec(function (arg, err) {
      if(err) next(err);
      res.redirect("/Sondaggio/riepilogo?id="+req.param('idSond'));
    });
};
