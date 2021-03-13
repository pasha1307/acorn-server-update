module.exports = function(sequelize, DataTypes) {
	const chargeto = sequelize.define('chargeto', {
		chargeToId: {
			type: DataTypes.STRING(16),
			allowNull: false,
			defaultValue: '',
			field: 'ChargeToID'
		},
		chargeToName: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'ChargeToName'
		},
		chargeToType: {
			type: DataTypes.STRING(6),
			allowNull: false,
			defaultValue: '',
			field: 'ChargeToType'
		}
	}, {
		tableName: 'chargeto',
		timestamps: false
	});

	return chargeto;
};
