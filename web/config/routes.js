/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'Home/index'
  },

  // AccountController
  'GET /Account/': 'AccountController.index',
  'GET /Account/login': 'AccountController.login',
  'POST /Account/login': 'AccountController.login',
  'GET /Account/logout': 'AccountController.logout',
  'GET /Account/alreadyLoggedIn': 'AccountController.alreadyLoggedIn',

  // UtenteController
  'GET /Utente/': 'UtenteController.index',
  'GET /Utente/new': 'UtenteController.new',
  'POST /Utente/create': 'UtenteController.create',

  // AmministratoreContenutiController
  'GET /AmministratoreContenuti/': 'AmministratoreContenutiController.index',
  'GET /AmministratoreContenuti/new': 'AmministratoreContenutiController.new',
  'POST /AmministratoreContenuti/create': 'AmministratoreContenutiController.create',

  // AmministratoreSistemaController
  'GET /AmministratoreSistema/': 'AmministratoreSistemaController.index',
  'GET /AmministratoreSistema/new': 'AmministratoreSistemaController.new',
  'POST /AmministratoreSistema/create': 'AmministratoreSistemaController.create',

  //SondaggioController
  'GET /Sondaggio/':'SondaggioController.index',
  'GET /Sondaggio/new':'SondaggioController.new',
  'GET /Sondaggio/sondaggioCreato':'SondaggioController.sondaggioCreato',
  'POST /Sondaggio/create':'SondaggioController.create',
  'GET /Sondaggio/riepilogo':'SondaggioController.riepilogo',
  'GET /Sondaggio/listaUtente':'SondaggioController.listaUtente',
  'GET /Sondaggio/listaAC':'SondaggioController.listaAC',
  'POST /Sondaggio/compilazione':'SondaggioController.compilazione',
  'POST /Sondaggio/salvaRisposte':'SondaggioController.salvaRisposte',
  'POST /Sondaggio/risultato':'SondaggioController.risultato',

  //ArgomentoController
  'GET /Argomento/':'ArgomentoController.index',
  'GET /Argomento/new':'ArgomentoController.new',
  'GET /Argomento/argomentoCreato':'ArgomentoController.argomentoCreato',
  'POST /Argomento/create':'ArgomentoController.create',

  //Solo funzionale, no view
  'POST /Domanda/create':'Domanda.create',
  'POST /Argomento/modificaArgomento':'ArgomentoController.modificaArgomento',
  'POST /Domanda/modificaDomanda':'DomandaController.modificaDomanda',
  'POST /Risposta/modificaRisposta':'RispostaController.modificaRisposta',
  'POST /Sondaggio/pubblicaSondaggio':'SondaggioController.pubblicaSondaggio'
};
