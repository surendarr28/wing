/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tbl_score', {
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
    iMemberId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'tbl_member',
        key: 'iMemberId'
      }
    }
  }, {
    tableName: 'tbl_score'
  });
};
