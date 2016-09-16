/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbl_email', {
    iEmailId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    vcEmail: {
      type: DataTypes.STRING,
      allowNull: false
    },
    iEmailType: {
      type: DataTypes.INTEGER(11),
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
    dtUpdateAt: {
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
    tableName: 'tbl_email'
  });
};
