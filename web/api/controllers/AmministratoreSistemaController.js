/**
 * AmministratoreSistemaController
 *
 * @description :: Server-side logic for managing Amministratoresistemas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  'new': function(req,res) {
    //TODO: qui ci si può arrivare solo se si è amministratori di sistema!
    res.view();
  },

  create: function(req,res,next) {
    //TODO: qui ci si può arrivare solo se si è amministratori di sistema!
    //dati login
    var username=req.param("username");
    var password=req.param("password");
    var hash=Account.computeHash(username,password);

    sails.getDatastore().transaction(function(db,proceed) {
      Account.create({username: username, hash: hash}).usingConnection(db).exec(function(err,account) {
        if (err) return proceed(err);

        AmministratoreSistema.create({account: account.id}).usingConnection(db).exec(function(err2,amministratoreSistema) {
          if (err2) return proceed(err2);

          return proceed();
        });
      });
    }).exec(function(err) {
      if (err) next(err);

      res.redirect("/AmministratoreSistema");
    });
  }

};

