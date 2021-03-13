/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	const oswWorkTypes = sequelize.define('oswWorkTypes', {
		oswid: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'OSW',
				key: 'oswid'
			},
			field: 'OSWID'
		},
		workTypeId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'workTypes',
				key: 'worktypeId'
			},
			field: 'WorkTypeID'
		}
	}, {
		tableName: 'OSWWorkTypes',
		timestamps: false
	});
	oswWorkTypes.associate= models => {
		oswWorkTypes.belongsTo(models.workTypes, {foreignKey: 'WorkTypeID'});
	}
	oswWorkTypes.associate = models => {
		oswWorkTypes.belongsTo(models.osw, {foreignKey: 'OSWID'})
	};
	return oswWorkTypes
};
