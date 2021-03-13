module.exports = function(sequelize, DataTypes) {
	const workDoneBy = sequelize.define('workDoneBy', {
		personId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			primaryKey: true,
			allowNull: false,
			unique: false,
			references: {
				model: 'people',
				key: 'personid'
			},
			field: 'PersonID'
		},
		identificationId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			unique: false,
			references: {
				model: 'itemIdentification',
				key: 'identificationid'
			},
			field: 'identificationId'
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
		tableName: 'WorkDoneBy',
		timestamps: false
	});
	workDoneBy.associate = models => {
		workDoneBy.belongsTo(models.people, {foreignKey: 'personId'})
		workDoneBy.belongsTo(models.itemIdentification, {foreignKey: 'identificationId', targetKey: 'identificationId'})
	}
	return workDoneBy;
};
