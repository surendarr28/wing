/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbl_grounds', {
    iGroundId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    vcGroundName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    iGameId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'tbl_games',
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
    },
    isOnline: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    members: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'tbl_grounds'
  });
};
