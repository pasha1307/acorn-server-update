/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('unlockedItems', {
		unlockedId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
            autoIncrement:true,
			allowNull: false,
			primaryKey: true,
			field: 'UnlockedID'
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
		expirationDate: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			field: 'ExpirationDate'
		},
		unlockedById: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: 'People',
				key: 'personid'
			},
			field: 'UnlockedByID'
		}
	}, {
		tableName: 'UnlockedItems'
	});
};
