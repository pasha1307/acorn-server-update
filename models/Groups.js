module.exports = function(sequelize, DataTypes) {
	const groups = sequelize.define('groups', {
		groupId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
            autoIncrement:true,
			allowNull: false,
			primaryKey: true,
			field: 'GroupID'
		},
		groupName: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'GroupName'
		},
		inactive: {
			type: DataTypes.INTEGER(1).UNSIGNED,
			allowNull: true,
			defaultValue: '0',
			field: 'Inactive'
		},
		projectId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			references: {
				model: 'Projects',
				key: 'projectId'
			},
			field: 'ProjectID'
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
		tableName: 'Groups',
        timestamps: false
	});
	groups.associate = models => {
		groups.belongsTo(models.projects, {foreignKey: 'ProjectID'})
	}
groups.associate = models => {
	    groups.hasMany(models.Record, {foreignKey: 'groupId', targetKey: 'groupId'})
	}
	return groups;
};
