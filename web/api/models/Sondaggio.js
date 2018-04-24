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
  },

  getById: function(id,cb) {
    Sondaggio.findOne({id:id}).populate('argomenti').exec(async function (err, sond) {
      if (sond == null) cb(err,null);

      var argNuovi = [];
      for (let arg of sond.argomenti) {
        var dd=null;
        await Domanda.find({argomento: arg.id}).populate('risposte').then(function (domande) {
          dd = domande;
        });
        arg.domande = dd;
        argNuovi.push(arg);
      }
      sond.argomenti = argNuovi;
      cb(null,sond);
    });
  },

};

