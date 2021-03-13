module.exports = function(sequelize, DataTypes) {
	const reportCounts = sequelize.define('reportCounts', {
		reportId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			primaryKey: true,
			unique: false,
			allowNull: false,
			references: {
				model: 'itemReport',
				key: 'reportId'
			},
			field: 'ReportID'
		},
		countType: {
			type: DataTypes.ENUM('Volumes','Sheets','Photos','Other','Housing','Boxes'),
			allowNull: false,
			primaryKey: true,
			field: 'CountType'
		},
		totalCount: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			defaultValue: '0',
			field: 'TotalCount'
		},
		description: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: '',
			field: 'Description'
		}
	}, {
		tableName: 'ReportsCounts',
		timestamps: false
	});
	reportCounts.associate = models => {
		reportCounts.belongsTo(models.itemReport, {foreignKey: 'reportId'})
	}
	return reportCounts;
};
