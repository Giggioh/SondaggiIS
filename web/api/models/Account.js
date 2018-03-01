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
      required: true
    },

    hash: {
      type: 'string',
      required: true
    },

    utente: {
      collection: "Utente",
      through: "AssociazioneAccount",
      via: "account"
    },

    amministratoreContenuti: {
      collection: "AmministratoreContenuti",
      through: "AssociazioneAccount",
      via: "account"
    },

    amministratoreSistema: {
      collection: "AmministratoreSistema",
      through: "AssociazioneAccount",
      via: "account"
    },
  }
};

