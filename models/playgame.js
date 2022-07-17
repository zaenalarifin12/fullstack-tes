'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlayGame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PlayGame.belongsTo(models.Game, {
        foreignKey: "gameId",
        as: "game",
      });

      PlayGame.belongsTo(models.Players, {
        foreignKey: "playerId",
        as: "player",
      });

      PlayGame.hasOne(models.EvaluasiGame, {
        foreignKey: "playGameId",
        as: "evaluasiGame",
      });
    }
  }
  PlayGame.init({
    gameId: DataTypes.INTEGER,
    playerId: DataTypes.INTEGER,
    poin: DataTypes.INTEGER,
    keterangan: DataTypes.TEXT

  }, {
    sequelize,
    modelName: 'PlayGame',
  });
  return PlayGame;
};