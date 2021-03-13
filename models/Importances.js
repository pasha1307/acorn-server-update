/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('importances', {
		importanceId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
            autoIncrement:true,
			allowNull: false,
			primaryKey: true,
			field: 'ImportanceID'
		},
		importance: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'Importance'
		},
		inactive: {
			type: DataTypes.INTEGER(3).UNSIGNED,
			allowNull: true,
			defaultValue: '0',
			field: 'Inactive'
		}
	}, {
		tableName: 'Importances',
        timestamps: false
	});
};
