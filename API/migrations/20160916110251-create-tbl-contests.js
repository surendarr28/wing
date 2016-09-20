'use strict';
module.exports = {
  up: function (queryInterface, DataTypes) {
    return queryInterface.createTable('tbl_contests', {
      iContestId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      iGroundId: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: 'tbl_grounds',
          key: 'iGroundId'
        }
      },
      iGameId: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: 'tbl_games',
          key: 'iGameId'
        }
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
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('tbl_contests');
  }
};