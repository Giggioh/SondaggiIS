/**
 * Risposta.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    domanda:{
      model:'Domanda',
      required:true
    },

    testo:{
      type:'string',
      required:true
    }
  }
};

