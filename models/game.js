'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Game.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });

      Game.hasMany(models.Players, {
        foreignKey: "gameId",
        as: "player",
      });

      Game.hasMany(models.PlayGame, {
        foreignKey: "gameId",
        as: "playGames",
      });
    }
  }
  Game.init({
    players: DataTypes.INTEGER,
    dice: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN

  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};