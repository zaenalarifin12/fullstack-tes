'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EvaluasiGame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      EvaluasiGame.belongsTo(models.PlayGame, {
        foreignKey: "playGameId",
        as: "playGame",
      });
    }
  }
  EvaluasiGame.init({
    playGameId: DataTypes.INTEGER,
    players: DataTypes.INTEGER,
    poin: DataTypes.INTEGER,
    ket: DataTypes.TEXT,
    sisa_dadu: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'EvaluasiGame',
  });
  return EvaluasiGame;
};