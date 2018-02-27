/**
 * Sondaggio.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    nome:{
      type:'string',
      required: true,
      primarykey:true
    },

    argomento:{
      model:'Argomento',
      required:true
    },

    dataPubblicazione:{
      type:'date',
      required: true
    },

    chiuso:{
      type:'boolean',
      required: true
    },

    bozza:{
      type:'boolean',
      required: true
    },

    cancellato:{
      type:'boolean',
      required: true
    },

    amministratoreContenuti:{
      model:'AmministratoreContenuti',
      unique: true
    },

    argomento:{
      type:'string',
      required:true
    },

    risposteDate:{
      collection:'RispostaData',
      via:'sondaggio'
    },

    statistica:{
      model:'Statistica'
    }
  }
};

