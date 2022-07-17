'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Players extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Players.hasMany(models.PlayGame, {
        foreignKey: "playerId",
        as: "players",
      });

      Players.hasMany(models.PlayGame, {
        foreignKey: "playerId",
        as: "playGames",
      });

      Players.belongsTo(models.Game, {
        foreignKey: "gameId",
        as: "player",
      });
    }
  }
  Players.init({
    name: DataTypes.STRING,
    order: DataTypes.INTEGER,
    gameId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Players',
  });
  return Players;
};