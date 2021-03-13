module.exports = function(sequelize, DataTypes) {
	const initialCounts = sequelize.define('initialCounts', {
		itemId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'items',
				key: 'itemId'
			},
			field: 'ItemID'
		},
		countType: {
			type: DataTypes.ENUM('Volumes','Sheets','Photos','Other','Housing','Boxes'),
			allowNull: false,
			primaryKey: true,
			field: 'CountType'
		},
		totalCount: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			defaultValue: '0',
			field: 'TotalCount'
		},
		description: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'Description'
		}
	},
		{
		tableName: 'InitialCounts',
		timestamps: false
	});
	initialCounts.associate = models => {
		initialCounts.belongsTo(models.items, {foreignKey: 'itemId'})
	}
	return initialCounts;
};
