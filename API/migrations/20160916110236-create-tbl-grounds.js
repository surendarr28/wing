'use strict';
module.exports = {
  up: function (queryInterface, DataTypes) {
    return queryInterface.createTable('tbl_grounds', {
      iGroundId: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      vcGroundName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      iGameId: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: 'tbl_games',
          key: 'iGameId'
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
      },
      isOnline: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      members: {
        type: DataTypes.INTEGER(11),
        allowNull: true
      }
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('tbl_grounds');
  }
};