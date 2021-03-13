/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('itemLogout', {
		logoutId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
            autoIncrement:true,
			allowNull: false,
			primaryKey: true,
			field: 'LogoutID'
		},
		logoutById: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: 'People',
				key: 'personid'
			},
			field: 'LogoutByID'
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
		logoutDate: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			field: 'LogoutDate'
		},
		toLocationId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			field: 'ToLocationID'
		},
		fromLocationId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			field: 'FromLocationID'
		}
	}, {
		tableName: 'ItemLogout'
	});
};
