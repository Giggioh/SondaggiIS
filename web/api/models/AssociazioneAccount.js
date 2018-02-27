/**
 * AssociazioneAccount.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    account: {
      model: 'Account',
      required: true,
      unique: true
    },

    utente: {
      model: 'Utente',
      unique: true
    },

    amministratoreContenuti: {
      model: 'AmministratoreContenuti',
      unique: true
    },

    amministratoreSistema: {
      model: 'AmministratoreSistema',
      unique: true
    }

    //TODO: utente+amministratoreContenuti+amministratoreSistema: solo uno settato, e almeno uno

  }
};

