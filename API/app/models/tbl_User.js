/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbl_User', {
    iUserId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    vcFirstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    vcMiddlename: {
      type: DataTypes.STRING,
      allowNull: true
    },
    vcLastname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dtDOB: {
      type: DataTypes.DATE,
      allowNull: true
    },
    vcAvathar: {
      type: DataTypes.TEXT,
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
    bStatus: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    }
  }, {
    tableName: 'tbl_User'
  });
};
