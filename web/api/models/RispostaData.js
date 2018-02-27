/**
 * Risposta_data.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    dataCompilazione:{
      type:'date',
      required:true
    },

    tempoCompilazione:{
      type:'datetime',
      required:true
    },

    sondaggio:{
      model:'Sondaggio'
    },

    risposte:{
      collection:'Risposta',
      via:'rispostaData'
    }
  }
};

