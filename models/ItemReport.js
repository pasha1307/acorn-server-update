module.exports = function(sequelize, DataTypes) {
	const itemReport = sequelize.define('itemReport', {
		reportId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
            autoIncrement:true,
			allowNull: false,
			primaryKey: true,
			field: 'ReportID'
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
		identificationId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			primaryKey: true,
			allowNull: false,
			references: {
				model: 'ItemIdentification',
				key: 'identificationid'
			},
			field: 'IdentificationID'
		},
		reportById: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: 'People',
				key: 'personid'
			},
			field: 'ReportByID'
		},
		reportDate: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			field: 'ReportDate'
		},
		treatment: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'Treatment'
		},
		summary: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'Summary'
		},
		height: {
			type: DataTypes.DECIMAL,
			defaultValue: 0,
			allowNull: true,
			field: 'Height'
		},
		width: {
			type: DataTypes.DECIMAL,
			allowNull: true,
			field: 'Width'
		},
		thickness: {
			type: DataTypes.DECIMAL,
			defaultValue: 0,
			allowNull: true,
			field: 'Thickness'
		},
		dimensionUnit: {
			type: DataTypes.STRING(10),
			defaultValue: 'inch',
			allowNull: true,
			field: 'DimensionUnit'
		},
		workLocationId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: 'Locations',
				key: 'locationid'
			},
			field: 'WorkLocationID'
		},
		examOnly: {
			type: DataTypes.INTEGER(1).UNSIGNED,
			allowNull: false,
			defaultValue: '0',
			field: 'ExamOnly'
		},
		customHousingOnly: {
			type: DataTypes.INTEGER(1).UNSIGNED,
			allowNull: false,
			defaultValue: '0',
			field: 'CustomHousingOnly'
		},
		adminOnly: {
			type: DataTypes.INTEGER(1).UNSIGNED,
			allowNull: false,
			defaultValue: '0',
			field: 'AdminOnly'
		},
		preservationRecommendations: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'PreservationRecommendations'
		},
		additionalMaterialsOnFile: {
			type: DataTypes.INTEGER(1).UNSIGNED,
			allowNull: false,
			defaultValue: '0',
			field: 'AdditionalMaterialsOnFile'
		}
	}, {
		tableName: 'ItemReport',
        timestamps: false
	});
	itemReport.associate = models => {
		itemReport.belongsTo(models.people, {as: 'workers', foreignKey: 'reportById' });
		itemReport.belongsTo(models.formats, {foreignKey: 'formatId'});
		itemReport.belongsTo(models.Record, {foreignKey: 'identificationId', targetKey: 'identificationId'});
		itemReport.belongsTo(models.itemIdentification, {foreignKey: 'identificationId'});
		itemReport.belongsTo(models.locations, {foreignKey: 'workLocationId', targetKey: 'locationId'});
		itemReport.belongsTo(models.itemImportances, {foreignKey: 'reportId', targetKey: 'reportId'});
		itemReport.belongsTo(models.itemProposal, {foreignKey: 'identificationId', targetKey: 'identificationId'});
		itemReport.hasMany(models.reportCounts, {foreignKey: 'reportId', targetKey: 'reportId'});
	}
	return itemReport;
};
