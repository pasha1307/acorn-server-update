/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	const roles = sequelize.define('roles', {
		personId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'people',
				key: 'personId'
			},
			field: 'PersonID'
		},
		roleType: {
			type: DataTypes.ENUM('Staff','Curator','Donor','Contractor'),
			allowNull: false,
			primaryKey: true,
			field: 'RoleType'
		}
	}, {
		tableName: 'Roles',
		timestamps: false
	});
	roles.associate = models => {
		roles.belongsTo(models.people, {foreignKey: 'PersonID'});
	}
	return roles;
};
