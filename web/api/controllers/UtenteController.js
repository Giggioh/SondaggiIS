/**
 * UtenteController
 *
 * @description :: Server-side logic for managing utentes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


  index: function(req,res) {
    Utente.find().populate("account").exec(function(err,utenti) {
      res.json(utenti);
    });
  },

  'new': function(req,res) {
    res.view();
  },

  create: function(req,res,next) {
    //dati login
    username=req.param("username");
    password=req.param("password");
    shajs=require("sha.js");
    hash=new shajs.sha256().update(username+":"+password).digest("hex");

    //dati utente
    nome=req.param("nome");
    cognome=req.param("cognome");

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

      res.redirect("/utente");
    });
  }

};

