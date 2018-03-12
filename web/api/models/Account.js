/**
 * Account.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    username: {
      type: 'string',
      required: true,
      unique: true
    },

    hash: {
      type: 'string',
      required: true
    },

    utente: {
      collection: "Utente",
      via: "account"
    },

    amministratoreContenuti: {
      collection: "AmministratoreContenuti",
      via: "account"
    },

    amministratoreSistema: {
      collection: "AmministratoreSistema",
      via: "account"
    },
  },

  computeHash: function(user,pass) {
    var shajs=require("sha.js");
    return new shajs.sha256().update(user+":"+pass).digest("hex");
  },

  //metodi per effettuare/verificare login
  login: function(req,user,pass,callback) {
    var hash=Account.computeHash(user,pass);

    //è importante che sia popolato, perchè quei dati ci servono durante la sessione!
    Account.findOne({username: user, hash: hash}).populate("utente")
                                                 .populate("amministratoreSistema")
                                                 .populate("amministratoreContenuti").exec(function(err,account) {
      if (err) return callback(err);
      if (account==null) return callback(new Error("Utente non valido."));

      Account.setCurrentUser(req,account);

      callback(null,account);
    });

  },
  isLoggedIn: function(req) {
    return req.session.account!=null;
  },
  getCurrentUser: function(req) {
    if (!this.isLoggedIn(req)) return null;
    return req.session.account;
  },
  setCurrentUser: function(req,account) {
    req.session.account=account;
  },


  //metodi rapidi per accesso a info sull'account loggato
  isUtente: function(req) {
    if (!Account.isLoggedIn(req)) return false;
    var acc=Account.getCurrentUser(req);

    return acc.utente.length>0;
  },
  isAmministratoreContenuti: function(req) {
    if (!Account.isLoggedIn(req)) return false;
    var acc=Account.getCurrentUser(req);

    return acc.amministratoreContenuti.length>0;
  },
  isAmministratoreSistema: function(req) {
    if (!Account.isLoggedIn(req)) return false;
    var acc=Account.getCurrentUser(req);

    return acc.amministratoreSistema.length>0;
  },
};

