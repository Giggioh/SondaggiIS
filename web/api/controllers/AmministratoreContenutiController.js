  /**
 * Amministratore_contenutiController
 *
 * @description :: Server-side logic for managing amministratore_contenutis
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  index: function(req,res) {
    if (GlobalService.isProd()) return res.forbidden();

    AmministratoreContenuti.find().populate("account").exec(function(err,amministratoriContenuti) {
      res.json(amministratoriContenuti);
    });
  },

  'new': function(req,res) {
    //TODO: lasciamo che sia l'AS a creare AC? o chiunque può creare un account del genere ma deve essere convalidato da un AS?
    if (!Account.isAmministratoreSistema(req)) return res.forbidden();

    res.view();

  },

  create: function(req,res,next) {
    if (!Account.isAmministratoreSistema(req)) return res.forbidden();

    //dati login
    var username=req.param("username");
    var password=req.param("password");
    var hash=Account.computeHash(username,password);

    sails.getDatastore().transaction(function(db,proceed) {
      Account.create({username: username, hash: hash}).usingConnection(db).exec(function(err,account) {
        if (err) return proceed(err);

        AmministratoreContenuti.create({account: account.id, attivo: true}).usingConnection(db).exec(function(err2,amministratoreContenuti) {
          if (err2) return proceed(err2);

          return proceed();
        });
      });
    }).exec(function(err) {
      if (err) next(err);

      res.redirect("/AmministratoreContenuti");
    });
  }

};

