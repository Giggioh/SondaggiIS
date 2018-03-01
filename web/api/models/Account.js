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
      via: "utente"
    },

    amministratoreContenuti: {
      collection: "AmministratoreContenuti",
      via: "amministratoreContenuti",
      through: "AssociazioneAccount"
    },

    amministratoreSistema: {
      collection: "AmministratoreSistema",
      via: "amministratoreSistema",
      through: "AssociazioneAccount"
    },

  }
};

