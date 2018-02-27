/**
 * Statistica.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    infoStatistica:{
      model:'InfoStatistica'
    },

    valida:{
      type:'boolean',
      required:true
    },

    dataAggiornamento:{
      type:'date',
      required:true
    },

    sondaggi:{
      collection:'Sondaggio',
      via:"statistica"
    }
  }
};

