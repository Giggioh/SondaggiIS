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
  }
};

