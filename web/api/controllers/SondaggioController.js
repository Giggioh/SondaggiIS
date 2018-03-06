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

  create: function (req, res) {
    var nome = req.param("nomeSondaggio");
    var pubblicazione = Date.now().toString();
    Sondaggio.create({nome: nome, dataPubblicazione: pubblicazione}).exec(function (err, sondaggio) {
      if(err) res.send({error:'sondaggio non salvato'});
      res.redirect('/Sondaggio/summary');
    });
  },

  'summary':function (req, res) {
    Sondaggi.findone(req.param('id')).exec(function (err, sondaggio) {
      if(err){
        res.send({error:'sondaggio non salvato'});
      }
      res.view({Sondaggio:sondaggio});
    });
  },

  'completeSurvey':function (req, res) {
    Sondaggio.findone(req.param('id')).exec(function (rer,sondaggio) {
      if(err) {
        res.send({error:'domande non salvate'});
      }
    });
    Domanda.find()
  }
};

