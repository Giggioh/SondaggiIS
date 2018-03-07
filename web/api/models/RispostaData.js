/**
 * Risposta_data.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    dataCompilazione:{
      type:'ref', //date non è supportato da sails 1.0
      columnType:'date', //quindi type diventa string e columnType diventa date e si ottiene lo stesso risultato
      required:true
    },

    tempoCompilazione:{
      type:'ref',
      columnType:'datetime', //come sopra
      required:true
    },

    sondaggio:{
      model:'Sondaggio'
    },
  }
};

