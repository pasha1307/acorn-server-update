module.exports = function(sequelize, DataTypes) {
	return sequelize.define('workTypes', {
		workTypeId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
            autoIncrement:true,
			allowNull: false,
			primaryKey: true,
			field: 'WorkTypeID'
		},
		workType: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'WorkType'
		},
		inactive: {
			type: DataTypes.INTEGER(3).UNSIGNED,
			allowNull: true,
			defaultValue: '0',
			field: 'Inactive'
		}
	}, {
		tableName: 'WorkTypes',
		timestamps: false
	});
};
