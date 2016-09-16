/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbl_game', {
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
      allowNull: true
    },
    iUpdatedBy: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    dtCreatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dtUpdatedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    members: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    iGameType: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'tbl_game_type',
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
    tableName: 'tbl_game'
  });
};
