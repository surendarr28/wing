/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tbl_games', {
    iGameId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    vcGameName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bStatus: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    iCreatedBy: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: 1
    },
    iUpdatedBy: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: 1
    },
    dtCreatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    dtUpdatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    members: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    iGameType: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'tbl_game_types',
        key: 'iGameTypeId'
      }
    },
    vcGameImage: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    vcDemo: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
      tableName: 'tbl_games'
    });
};
