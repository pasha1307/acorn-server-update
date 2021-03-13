module.exports = function(sequelize, DataTypes) {
	const osw = sequelize.define('osw', {
		oswid: {
			type: DataTypes.INTEGER(10).UNSIGNED,
            autoIncrement:true,
			allowNull: false,
			primaryKey: true,
			field: 'OSWID'
		},
		identificationId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			references: {
				model: 'ItemIdentification',
				key: 'identificationid'
			},
			field: 'IdentificationID'
		},
		proposedHours: {
			type: DataTypes.DECIMAL,
			allowNull: true,
			field: 'ProposedHours'
		},
		workStartDate: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			field: 'WorkStartDate'
		},
		workEndDate: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			field: 'WorkEndDate'
		},
		formatId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			references: {
				model: 'Formats',
				key: 'formatid'
			},
			field: 'FormatID'
		},
		workLocationId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			references: {
				model: 'Locations',
				key: 'locationId'
			},
			field: 'WorkLocationID'
		},
	}, {
		tableName: 'OSW',
		timestamps: false
	});
	osw.associate = models => {
		osw.belongsToMany(models.workTypes, {through: models.oswWorkTypes, foreignKey: 'OSWID', otherKey: 'WorkTypeID'});
		osw.hasMany(models.workDone, {foreignKey: 'oswid', targetKey: 'oswid'});
		osw.belongsTo(models.formats, {foreignKey: 'FormatID'});
		osw.belongsTo(models.itemIdentification, {foreignKey: 'identificationId'});
		osw.belongsTo(models.locations, {foreignKey: 'workLocationId', targetKey: 'locationId'});
		// osw.belongsTo(models.Record, {foreignKey: 'identificationId'})
	}
	return osw;
};
