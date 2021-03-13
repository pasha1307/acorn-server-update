/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('itemConservators', {
		personId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: 'People',
				key: 'personid'
			},
			field: 'PersonID'
		},
		reportId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: 'ItemReport',
				key: 'reportid'
			},
			field: 'ReportID'
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
		tableName: 'ItemConservators'
	});
};
