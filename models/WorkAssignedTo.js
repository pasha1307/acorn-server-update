/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
const workAssignedTo = sequelize.define('workAssignedTo', {
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
		itemId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'items',
				key: 'itemId'
			},
			field: 'ItemID'
		}
	}, {
		tableName: 'WorkAssignedTo',
        timestamps: false
	});
workAssignedTo.associate = models => {
	workAssignedTo.belongsTo(models.people, {foreignKey: 'personId'})
}
return workAssignedTo
};
