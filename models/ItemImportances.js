module.exports = function(sequelize, DataTypes) {
	const itemImportances = sequelize.define('itemImportances', {
		importanceId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'Importances',
				key: 'importanceid'
			},
			field: 'ImportanceID'
		},
		reportId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'ItemReport',
				key: 'reportid'
			},
			field: 'ReportID'
		}
	}, {
		tableName: 'ItemImportances',
		timestamps: false
	});
	itemImportances.associate = models => {
		itemImportances.belongsTo(models.importances, {foreignKey: 'importanceId', targetKey: 'importanceId'} )
	}
	return itemImportances
};
