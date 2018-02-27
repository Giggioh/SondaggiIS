/**
 * Account.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true
    },

    hash: {
      type: 'string',
      required: true
    },

    utente: {
      model: "Utente",
      via: "utente",
      through: "AssociazioneAccount"
    },

    amministratoreContenuti: {
      model: "AmministratoreContenuti",
      via: "amministratoreContenuti",
      through: "AssociazioneAccount"
    },

    amministratoreSistema: {
      model: "AmministratoreSistema",
      via: "amministratoreSistema",
      through: "AssociazioneAccount"
    },

  }
};

