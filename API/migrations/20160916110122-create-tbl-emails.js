'use strict';
module.exports = {
  up: function (queryInterface, DataTypes) {
    return queryInterface.createTable('tbl_emails', {
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
      dtUpdateAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
      },
      iUserId: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: 'tbl_users',
          key: 'iUserId'
        }
      }
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('tbl_emails');
  }
};