/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('savedSearches', {
		searchId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
            autoIncrement:true,
			allowNull: false,
			primaryKey: true,
			field: 'SearchID'
		},
		searchName: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'SearchName'
		},
		personId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: 'People',
				key: 'personid'
			},
			field: 'PersonID'
		},
		isGlobal: {
			type: DataTypes.INTEGER(1).UNSIGNED,
			allowNull: false,
			defaultValue: '0',
			field: 'IsGlobal'
		},
		fileName: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'FileName'
		}
	}, {
		tableName: 'SavedSearches'
	});
};
