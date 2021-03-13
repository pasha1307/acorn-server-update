module.exports = function(sequelize, DataTypes) {
	const departments = sequelize.define('departments', {
		departmentId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			autoIncrement:true,
			allowNull: false,
			primaryKey: true,
			field: 'DepartmentID'
		},
		locationId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			field: 'LocationID'
		},
		departmentName: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'DepartmentName'
		},
		shortName: {
			type: DataTypes.STRING(50),
			allowNull: true,
			field: 'ShortName'
		},
		acronym: {
			type: DataTypes.STRING(10),
			allowNull: true,
			field: 'Acronym'
		},
		inactive: {
			type: DataTypes.INTEGER(1).UNSIGNED,
			allowNull: true,
			defaultValue: '0',
			field: 'Inactive'
		}
	}, {
		tableName: 'Departments',
        timestamps: false,
	});
	departments.associate = models => {
		departments.belongsTo(models.locations, {foreignKey: 'locationId'})
	}
	return departments;
};
