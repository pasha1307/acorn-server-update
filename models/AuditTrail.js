/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
const auditTrail = sequelize.define('auditTrail', {
		auditTrailId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			field: 'AuditTrailID'
		},
		personId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: 'people',
				key: 'personId'
			},
			field: 'PersonID'
		},
		actionType: {
			type: DataTypes.ENUM('Insert','Update','Delete'),
			allowNull: false,
			defaultValue: 'Insert',
			field: 'ActionType'
		},
		date: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'Date'
		},
		details: {
			type: DataTypes.STRING(1024),
			allowNull: true,
			field: 'Details'
		},
		tableName: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'TableName'
		},
		pkid: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			field: 'PKID'
		}
	}, {
		tableName: 'AuditTrail',
			timestamps: false
	})
	auditTrail.associate = models => {
		// callNumbers.belongsTo(models.items, {foreignKey: 'identificationId'})
		// callNumbers.belongsTo(models.itemIdentification, {foreignKey: 'identificationId'})
	}
	return auditTrail;
};
