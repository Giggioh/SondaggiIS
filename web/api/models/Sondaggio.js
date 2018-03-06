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
    },

    argomento:{
      model:'Argomento',
      //required:true
    },

    dataPubblicazione:{
      type:'string', //date non è più supportato in sails 1.0
      columnType:'date', //si usa string con columnType invece
      required: true
    },

    chiuso:{
      type:'boolean',
      //required: true
    },

    bozza:{
      type:'boolean',
      //required: true
    },

    cancellato:{
      type:'boolean',
      //required: true
    },

    amministratoreContenuti:{
      model:'AmministratoreContenuti',
      unique: true
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

