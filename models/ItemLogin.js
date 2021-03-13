/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('itemLogin', {
		loginId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
            autoIncrement:true,
			allowNull: false,
			primaryKey: true,
			field: 'LoginID'
		},
		identificationId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: 'ItemIdentification',
				key: 'identificationid'
			},
			field: 'IdentificationID'
		},
		loginById: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: 'People',
				key: 'personid'
			},
			field: 'LoginByID'
		},
		loginDate: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			field: 'LoginDate'
		},
		fromLocationId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			field: 'FromLocationID'
		},
		toLocationId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			field: 'ToLocationID'
		}
	}, {
		tableName: 'ItemLogin'
	});
};
