const validTypes = ["Festif","Lucratif","Non Lucratif","Inauguration","Anniversaire","Mariage","Action Caritative", "Fête Commerciale","Remercier","Lancement de Produit"]



module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Evennement', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique : {
          msg: 'Le nom est déjà pris'
        },
        validate: {
          notEmpty: {msg: 'l e nom ne peut pas être vide.'},
          notNull: {msg: 'Le nom est une propriété requise'}
        }
      },
      nombre_de_personnes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args : [0],
            msg : 'le nombre de personnes doit être sup ou égales à 0.'
          },
          isInt : {msg: 'Utilisez uniquement des nombres entiers.'},
          notNull:{msg: 'Le nombre est une propriété requise'}
        }
      },
      lieu: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {msg: 'le lieu ne peut pas être vide.'},
          notNull: {msg: 'Le lieu est une propriété requise'}
        }
      },
      Objectif_de_l_evennement: {
        type: DataTypes.STRING,
        allowNull: false,
        get(){
          return this.getDataValue('types').split(',')
        },
        set(types){
          this.setDataValue('types', types.join())
        },
        validate : {
          isTypesValid(value) {
            if (!value) {
              throw new Error ('l\'évennement doit au moins avoir un objectif')
            }
            value.split(',').forEach(type => {
              if (!validTypes.includes(type)) {
                throw new Error (`L\'objectif d\'un evennement doit appartenir à la liste suivante : ${validTypes}`)
              }
            })
          }
        }
      }
    },{
        timestamps: true,
        createdAt: 'created',
        updatesAt: false
    })
  }