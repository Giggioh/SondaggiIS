/**
 * UtenteController
 *
 * @description :: Server-side logic for managing utentes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  'new': function(req,res) {
    res.view();
  },

  create: function(req,res,next) {
    //dati login
    username=req.param("username");
    password=req.param("password");

    //dati utente
    nome=req.param("nome");
    cognome=req.param("cognome");

    sails.getDatastore().transaction(function(db,proceed) {
      Account.create({username: username, password: password}).exec(function(err,account) {
        if (err) return proceed(err);

        Utente.create({nome: nome, cognome: cognome, account: account}).exec(function(err,utente) {
          if (err) return proceed(err);

          return proceed();
        });
      });
    }).exec(function(err) {
      if (err) next(err);

      res.redirect("/utente");
    });
  }

};

