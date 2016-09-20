/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tbl_scores', {
    iScore: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    vcScores: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    iContestId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'tbl_contests',
        key: 'iContestId'
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
    iMemberId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'tbl_members',
        key: 'iMemberId'
      }
    }
  }, {
      tableName: 'tbl_scores'
    });
};
