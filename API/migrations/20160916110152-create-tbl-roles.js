'use strict';
module.exports = {
  up: function (queryInterface, DataTypes) {
    return queryInterface.createTable('tbl_roles', {
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
          model: 'tbl_users',
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
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('tbl_roles');
  }
};