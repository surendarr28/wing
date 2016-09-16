/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbl_role', {
    iRoleId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    iUserId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'tbl_User',
        key: 'iUserId'
      }
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
    }
  }, {
    tableName: 'tbl_role'
  });
};
