module.exports = function(sequelize, DataTypes) {
	const callNumbers = sequelize.define('callNumbers', {
		callNumber: {
			type: DataTypes.STRING(255),
			allowNull: false,
			primaryKey: true,
			field: 'CallNumber'
		},
		identificationId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			defaultValue: '0',
			primaryKey: true,
			// references: {
			// 	model: 'items',
			// 	key: 'identificationid'
			// },
			field: 'IdentificationID'
		}
	}, {
		tableName: 'CallNumbers',
		timestamps: false
	});
	callNumbers.associate = models => {
		// callNumbers.belongsTo(models.items, {foreignKey: 'identificationId'})
		// callNumbers.belongsTo(models.itemIdentification, {foreignKey: 'identificationId'})
	}
	return callNumbers;
};
