module.exports = function(sequelize, DataTypes) {
	const autotext = sequelize.define('autotext', {
		autotextId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			field: 'AutotextID'
		},
		caption: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'Caption'
		},
		autotext: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'Autotext'
		},
		personId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			references: {
				model: 'people',
				key: 'personid'
			},
			field: 'PersonID'
		},
		autotextType: {
			type: DataTypes.ENUM('Dependency','Treatment','Description','Condition','Preservation','ProposedTreatment'),
			allowNull: true,
			field: 'AutotextType'
		},
		dependentAutotextId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			field: 'DependentAutotextID'
		},
		isGlobal: {
			type: DataTypes.INTEGER(1).UNSIGNED,
			allowNull: false,
			defaultValue: '0',
			field: 'IsGlobal'
		}
	}, {
		tableName: 'Autotext',
		timestamps: false
	});
	return autotext
};
