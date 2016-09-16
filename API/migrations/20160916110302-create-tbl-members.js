'use strict';
module.exports = {
  up: function (queryInterface, DataTypes) {
    return queryInterface.createTable('tbl_members', {
      iMemberId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      iContestId: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: 'tbl_contests',
          key: 'iContestId'
        }
      },
      iUserId: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: 'tbl_users',
          key: 'iUserId'
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
      }
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('tbl_members');
  }
};