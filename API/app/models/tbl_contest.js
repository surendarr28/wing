/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbl_contest', {
    iContestId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    iGroundId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'tbl_ground',
        key: 'iGroundId'
      }
    },
    iGameId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'tbl_game',
        key: 'iGameId'
      }
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
    bStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    tableName: 'tbl_contest'
  });
};
