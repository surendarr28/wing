'use strict';
module.exports = {
  up: function (queryInterface, DataTypes) {
    return queryInterface.createTable('tbl_users', {
      iUserId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      vcFirstname: {
        type: DataTypes.STRING,
        allowNull: true
      },
      vcLastname: {
        type: DataTypes.STRING,
        allowNull: true
      },
      vcMiddlename: {
        type: DataTypes.STRING,
        allowNull: true
      },
      dtDOB: {
        type: DataTypes.DATE,
        allowNull: true
      },
      dtAvathar: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      bStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      createdBy: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      updatedBy: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      dtCreatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      dtUpdatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('tbl_users');
  }
};