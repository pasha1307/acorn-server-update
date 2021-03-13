module.exports = function(sequelize, DataTypes) {
	const purposes = sequelize.define('purposes', {
		purposeId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
            autoIncrement:true,
			allowNull: false,
			primaryKey: true,
			field: 'PurposeID'
		},
		purpose: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'Purpose'
		},
		inactive: {
			type: DataTypes.INTEGER(1).UNSIGNED,
			allowNull: true,
			defaultValue: '0',
			field: 'Inactive'
		}
	}, {
		tableName: 'Purposes',
        timestamps: false
	});
	return purposes;
};
