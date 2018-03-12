/**
 * UtenteController
 *
 * @description :: Server-side logic for managing utentes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  index: function(req,res) {
    if (GlobalService.isProd()) return res.forbidden();

    Utente.find().populate("account").exec(function(err,utenti) {
      res.json(utenti);
    });
  },

  'new': function(req,res) {
    //TODO: ci si può arrivare solo se non si è loggati
    res.view();
  },

  create: function(req,res,next) {
    //TODO: ci si può arrivare solo se non si è loggati
    //dati login
    var username=req.param("username");
    var password=req.param("password");
    var hash=Account.computeHash(username,password);

    //dati utente
    var nome=req.param("nome");
    var cognome=req.param("cognome");

    sails.getDatastore().transaction(function(db,proceed) {
      Account.create({username: username, hash: hash}).usingConnection(db).exec(function(err,account) {
        if (err) return proceed(err);

        Utente.create({nome: nome, cognome: cognome, account: account.id}).usingConnection(db).exec(function(err2,utente) {
          if (err2) return proceed(err2);

          return proceed();
        });
      });
    }).exec(function(err) {
      if (err) next(err);

      res.redirect("/Utente"); //TODO: schermata successo registrazione
    });
  }

};

