module.exports = function(sequelize, DataTypes) {
	return sequelize.define('locationHistory', {
		locationHistoryId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
            autoIncrement:true,
			allowNull: false,
			primaryKey: true,
			field: 'LocationHistoryID'
		},
		itemId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: 'Items',
				key: 'itemid'
			},
			field: 'ItemID'
		},
		dateIn: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'DateIn'
		},
		locationId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: 'Locations',
				key: 'locationid'
			},
			field: 'LocationID'
		},
		dateOut: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'DateOut'
		},
		isPartial: {
			type: DataTypes.INTEGER(1).UNSIGNED,
			allowNull: false,
			defaultValue: '0',
			field: 'IsPartial'
		},
		isTemporary: {
			type: DataTypes.INTEGER(1).UNSIGNED,
			allowNull: false,
			defaultValue: '0',
			field: 'IsTemporary'
		},
		partialComments: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'PartialComments'
		}
	}, {
		tableName: 'LocationHistory'
	});
};
