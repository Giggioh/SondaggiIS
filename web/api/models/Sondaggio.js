/**
 * Sondaggio.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
1
module.exports = {

  attributes: {

    nome:{
      type:'string',
      required: true,
    },

    dataPubblicazione:{ //data pubblicazione non può essere required, siccome apprena creato il sondaggio è privato e non pubblicato
      type:'ref', //date non è più supportato in sails 1.0
      columnType:'date', //si usa string con columnType invece
    },

    argomenti:{
      collection:'Argomento',
      via:'sondaggio'
    },

    chiuso:{
      type:'boolean',
      //required: true
    },

    bozza:{
      type:'boolean',
    },

    cancellato:{
      type:'boolean',
    },

    amministratoreContenuti:{
      model:'AmministratoreContenuti',
      unique: true,
    },

    risposteDate:{
      collection:'RispostaData',
      via:'sondaggio',
    },

    statistica: {
      model: 'Statistica',
    }
  }
};

