/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbl_login', {
    iLoginId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    vcUsername: {
      type: DataTypes.STRING,
      allowNull: true
    },
    vcPassword: {
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
    iUserId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'tbl_User',
        key: 'iUserId'
      }
    }
  }, {
    tableName: 'tbl_login'
  });
};
