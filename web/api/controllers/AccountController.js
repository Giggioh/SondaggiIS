/**
 * AccountController
 *
 * @description :: Server-side logic for managing accounts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /*login: function(req,res,next) {
    //se sono già autenticato, vado al controller corrispondente
    if (Account.isLoggedIn(req)) return res.redirect("/Account/alreadyLoggedIn");

    //verifico se ho già inserito dei dati
    var username=req.param("username");
    var password=req.param("password");
    if (username!=null && password!=null) {
      //tento il login
      Account.login(req,username,password,function(err,account) {
        if (err) return res.view({Error: true});
        if(Account.isAmministratoreContenuti(req)) return res.redirect('/Sondaggio/listaAC');
        if(Account.isUtente(req)) return res.redirect('/Sondaggio/listaUtente');
        return res.redirect("/"); //torniamo alla homepage dopo aver effettuato il login!
      });

    } else {
      //mostro la view per l'inserimento dei dati
      res.view();
    }
  },*/
  login: function(req,res,next) {
    //se sono già autenticato, vado al controller corrispondente
    //if (Account.isLoggedIn(req)) return res.badRequest("Already logged in.");

    //verifico se ho già inserito dei dati
    var username=req.param("username");
    var password=req.param("password");

    if (username!=null && password!=null) {
      //tento il login
      Account.login(req,username,password,function(err,jwt) {
        if (err) return res.badRequest("Username/password errati.");
        return res.json(jwt);
      });
    } else return res.badRequest("Username o password mancante.");
  },

  /*logout: function(req,res,next) {
    if (!Account.isLoggedIn(req)) return res.redirect("/Account/login");

    Account.setCurrentUser(req,null);
    res.redirect("/");
  },

  alreadyLoggedIn: function(req,res,next) {
    //se non sono loggato, non voglio visualizzare questa pagina
    if (!Account.isLoggedIn(req)) return res.redirect("Account/login");

    res.view(); //non mi serve di passare l'account alla view perchè sta nella session
  }*/

};

