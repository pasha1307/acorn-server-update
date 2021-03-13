module.exports = function(sequelize, DataTypes) {
	const projects = sequelize.define('projects', {
		projectId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
            autoIncrement:true,
			allowNull: false,
			primaryKey: true,
			field: 'ProjectID'
		},
		projectName: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'ProjectName'
		},
		startDate: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			field: 'StartDate'
		},
		endDate: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			field: 'EndDate'
		},
		inactive: {
			type: DataTypes.INTEGER(3).UNSIGNED,
			allowNull: true,
			defaultValue: '0',
			field: 'Inactive'
		},
		projectDescription: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'ProjectDescription'
		},
		isBeingEdited: {
			type: DataTypes.INTEGER(1).UNSIGNED,
			allowNull: true,
			defaultValue: '0',
			field: 'IsBeingEdited'
		},
		editedById: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			field: 'EditedByID'
		}
	}, {
		tableName: 'Projects',
        timestamps: false
	});
projects.associate = models => {
	projects.hasMany(models.groups, {foreignKey: 'ProjectID'})
}
	return projects;
};
