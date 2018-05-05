/**
 * UtenteController
 *
 * @description :: Server-side logic for managing utentes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  register: function(req,res,next) {
    //TODO: ci si può arrivare solo se non si è loggati
    //dati login
    var username=req.param("account").username;
    var password=req.param("account").password;
    var hash=Account.computeHash(username,password);

    //dati utente
    var nome=req.param("utente").nome;
    var cognome=req.param("utente").cognome;

    sails.getDatastore().transaction(function(db,proceed) {
      Account.create({username: username, hash: hash}).usingConnection(db).exec(function(err,account) {
        if (err) return proceed(err);

        Utente.create({nome: nome, cognome: cognome, account: account.id}).usingConnection(db).exec(function(err2,utente) {
          if (err2) return proceed(err2);

          return proceed();
        });
      });
    }).exec(function(err) {
      if (err) res.badRequest();

      res.ok();
    });
  }

};

