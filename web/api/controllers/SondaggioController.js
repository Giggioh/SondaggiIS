/**
 * SondaggioController
 *
 * @description :: Server-side logic for managing sondaggios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  'new' :function (req, res) {
    res.view('/Sondaggio/new');
  },

  'crea': function (req, res) {
    var nome = req.body.nomeSondaggio.text().toString();
    var pubblicazione = Date.now();
    Sondaggio.create({nome:nome, dataPubblicazione: pubblicazione}).exec(function(err){
      if(err) res.send(500, {error: 'database error'});
    });
    res.redirect('/Sondaggio/Riepilogo', id);
  },

  'riepilogo':function (req, res) {
    Sondaggi.findone({id: req.id}).exec(function (err) {
      if(err)
        res.send({error:'sondaggio non salvato'});
    });
    res.view('/Sondaggio/Riepilogo');
  },
};

