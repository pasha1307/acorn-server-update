module.exports = function(sequelize, DataTypes) {
	const people = sequelize.define('people', {
		personId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
            autoIncrement:true,
			allowNull: false,
			primaryKey: true,
			field: 'PersonID'
		},
		locationId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			references: {
				model: 'Locations',
				key: 'locationid'
			},
			field: 'LocationID'
		},
		firstName: {
			type: DataTypes.STRING(50),
			allowNull: false,
			field: 'FirstName'
		},
		middleName: {
			type: DataTypes.STRING(50),
			allowNull: true,
			field: 'MiddleName'
		},
		lastName: {
			type: DataTypes.STRING(50),
			allowNull: false,
			field: 'LastName'
		},
		username: {
			type: DataTypes.STRING(50),
			allowNull: true,
			field: 'Username'
		},
		userPassword: {
			type: DataTypes.STRING(250),
			allowNull: true,
			field: 'UserPassword'
		},
		inactive: {
			type: DataTypes.INTEGER(1).UNSIGNED,
			allowNull: true,
			defaultValue: '0',
			field: 'Inactive'
		},
		accessLevel: {
			type: DataTypes.ENUM('Admin','Regular','Repository Admin','Repository','None','Curator'),
			allowNull: false,
			defaultValue: 'Regular',
			field: 'AccessLevel'
		},
		displayName: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'DisplayName'
		},
		sortName: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'SortName'
		},
		initials: {
			type: DataTypes.STRING(50),
			allowNull: true,
			field: 'Initials'
		},
		emailAddress: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'EmailAddress'
		},
		receiveAllDrsEmail: {
			type: DataTypes.INTEGER(1).UNSIGNED,
			allowNull: false,
			defaultValue: '0',
			field: 'ReceiveAllDRSEmail'
		}
	}, {
		tableName: 'People',
        timestamps: false
	});
	people.associate = (models) => {
		// people.belongsToMany(models.items, {through: models.workAssignedTo, foreignKey: 'PersonID'});
		people.hasMany(models.Record, {as: 'Coordinator', foreignKey: 'CoordinatorID'});
		people.hasMany(models.Record, {as: 'Curator', foreignKey: 'CuratorID'});
		people.hasMany(models.Record, {as: 'CuratorPlus', foreignKey: 'approvingCuratorId'});
		people.hasMany(models.itemIdentification, {as: 'Curators', foreignKey: 'curatorId'});
		people.belongsTo(models.locations, {foreignKey: 'locationId'});
		people.belongsTo(models.auditTrail, {foreignKey: 'personId'});

		people.belongsToMany(models.itemProposal, { through: 'proposedBy', foreignKey: 'personId' })
		people.belongsToMany(models.itemIdentification, { through: 'workDoneBy', foreignKey: 'PersonID' })

	}
	return people;
};
