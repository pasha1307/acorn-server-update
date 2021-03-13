/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('temporaryTransfers', {
		temporaryTransferId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
            autoIncrement:true,
			allowNull: false,
			primaryKey: true,
			field: 'TemporaryTransferID'
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
		transferDate: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			field: 'TransferDate'
		},
		fromLocationId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: 'Locations',
				key: 'locationid'
			},
			field: 'FromLocationID'
		},
		toLocationId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			field: 'ToLocationID'
		},
		transferType: {
			type: DataTypes.ENUM('Transfer','Return'),
			allowNull: false,
			defaultValue: 'Transfer',
			field: 'TransferType'
		}
	}, {
		tableName: 'TemporaryTransfers'
	});
};
