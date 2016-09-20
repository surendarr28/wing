/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tbl_logins',
    {
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
        allowNull: true,
        defaultValue: 1
      },
      iUpdatedBy: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        defaultValue: 1
      },
      iUserId: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: 'tbl_users',
          key: 'iUserId'
        }
      },
      dtCreatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      dtUpdatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    },
    {
      tableName: 'tbl_logins'
    });
};
