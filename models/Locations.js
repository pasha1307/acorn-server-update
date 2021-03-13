module.exports = function(sequelize, DataTypes) {
const locations = sequelize.define('locations', {
		locationId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
            autoIncrement:true,
			allowNull: false,
			primaryKey: true,
			field: 'LocationID'
		},
		location: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'Location'
		},
		tub: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: 'TUB'
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
		},
		isRepository: {
			type: DataTypes.INTEGER(1).UNSIGNED,
			allowNull: true,
			defaultValue: '1',
			field: 'IsRepository'
		},
		isWorkLocation: {
			type: DataTypes.INTEGER(1).UNSIGNED,
			allowNull: true,
			defaultValue: '0',
			field: 'IsWorkLocation'
		}
	}, {
		tableName: 'Locations',
        timestamps: false
	});
locations.associate = models => {
	locations.hasMany(models.departments, {foreignKey: 'LocationID'})
}
return locations
};
