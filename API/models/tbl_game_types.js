/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tbl_game_types', {
    iGameTypeId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    vcGameType: {
      type: DataTypes.STRING,
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
    bStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
      tableName: 'tbl_game_types'
    });
};
