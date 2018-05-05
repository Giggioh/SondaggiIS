/**
 * Statistica.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    risposta:{
      model:'Risposta',
      required:true
    },

    tipo:{
      type:'string',
      required:true
    },

    //TODO: implementale
    valida:{
      type:'boolean',
      required:true
    },

    dataAggiornamento:{
      type:'ref',
      columnType:'date', //come altri
      required:true
    },

  }
};

