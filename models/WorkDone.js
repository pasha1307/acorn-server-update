module.exports = function(sequelize, DataTypes) {
	const workDone = sequelize.define('workDone', {
		personId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			primaryKey: true,
			allowNull: false,
			references: {
				model: 'people',
				key: 'personid'
			},
			field: 'PersonID'
		},
		oswid: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: 'osw',
				key: 'oswid'
			},
			field: 'OSWID'
		},
		completedHours: {
			type: DataTypes.DECIMAL,
			allowNull: false,
			field: 'CompletedHours'
		},
		dateCompleted: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			field: 'DateCompleted'
		}
	}, {
		tableName: 'WorkDone',
		timestamps: false
	});
	workDone.associate = models => {
		// workDone.belongsTo(models.osw, {foreignKey: 'oswid'}),
		// workDone.belongsTo(models.people, {foreignKey: 'PersonID'})
	}
	return workDone
};
