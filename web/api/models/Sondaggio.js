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

  findPop: function(query,cb) {
    Sondaggio.find(query).populateAll().exec(async function (err, sondaggi) {
      if (sondaggi == null) cb(err, null);

      var sondNuovi = [];
      for (let sond of sondaggi) {
        sondNuovi.push(await Sondaggio.populateOne(sond));
      }

      cb(null,sondNuovi);
    });
  },

  findOnePop: function(query,cb) {
    Sondaggio.findOne(query).populateAll().exec(async function (err, sond) {
      if (sond == null) cb(err,null);

      sond=await Sondaggio.populateOne(sond);
      cb(null,sond);
    });
  },

  populateOne: async function(sond) {
    var argNuovi = [];
    for (let arg of sond.argomenti) {
      arg.domande = await Domanda.find({argomento: arg.id}).populateAll();
      argNuovi.push(arg);
    }
    sond.argomenti = argNuovi;

    sond.amministratoreContenuti.account=await Account.findOne({id: sond.amministratoreContenuti.account}).populateAll();

    return sond;
  }

};

