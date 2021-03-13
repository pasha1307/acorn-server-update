module.exports = function(sequelize, DataTypes) {
	const storage = sequelize.define('storage', {
		storageId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
            autoIncrement:true,
			allowNull: false,
			primaryKey: true,
			field: 'StorageID'
		},
		storage: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'Storage'
		},
		inactive: {
			type: DataTypes.INTEGER(1).UNSIGNED,
			allowNull: false,
			defaultValue: '0',
			field: 'Inactive'
		}
	}, {
		tableName: 'Storage',
		timestamps: false
	});
	return storage;
};
