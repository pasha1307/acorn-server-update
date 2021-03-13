module.exports = function(sequelize, DataTypes) {
	const itemIdentification = sequelize.define('itemIdentification', {
		identificationId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
            autoIncrement:true,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'Record',
				key: 'identificationId'
			},
			field: 'IdentificationID'
		},
		purposeId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			references: {
				model: 'Purposes',
				key: 'purposeId'
			},
			field: 'PurposeID'
		},
		homeLocationId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			references: {
				model: 'locations',
				key: 'locationId'
			},
			field: 'HomeLocationID'
		},
		title: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'Title'
		},
		departmentId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			field: 'DepartmentID'
		},
		groupId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			references: {
				model: 'Groups',
				key: 'groupId'
			},
			field: 'GroupID'
		},
		projectId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			references: {
				model: 'Projects',
				key: 'projectId'
			},
			field: 'ProjectID'
		},
		comments: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'Comments'
		},
		inactive: {
			type: DataTypes.INTEGER(1).UNSIGNED,
			allowNull: true,
			defaultValue: '0',
			field: 'Inactive'
		},
		editCounter: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			field: 'EditCounter'
		},
		nonDigitalImagesExist: {
			type: DataTypes.INTEGER(1).UNSIGNED,
			allowNull: true,
			defaultValue: '0',
			field: 'NonDigitalImagesExist'
		},
		isBeingEdited: {
			type: DataTypes.INTEGER(1).UNSIGNED,
			allowNull: true,
			defaultValue: '0',
			field: 'IsBeingEdited'
		},
		editedById: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			field: 'EditedByID'
		},
		curatorId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			references: {
				model: 'People',
				key: 'personId'
			},
			field: 'CuratorID'
		},
		approvingCuratorId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			defaultValue: '0',
			references: {
				model: 'People',
				key: 'personId'
			},
			field: 'ApprovingCuratorID'
		},
		manuallyClosed: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: '0',
			field: 'ManuallyClosed'
		},
		manuallyClosedDate: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'ManuallyClosedDate'
		},
		chargeToId: {
			type: DataTypes.STRING(50),
			allowNull: true,
			field: 'ChargeToID'
		}
	}, {
		tableName: 'ItemIdentification',
        timestamps: false,
	});
	itemIdentification.associate = models => {
		itemIdentification.belongsTo(models.Record, {foreignKey: 'identificationId', targetKey: 'identificationId'});
		itemIdentification.belongsTo(models.people, {as: 'ItemCurator' ,foreignKey: 'curatorId'});
		itemIdentification.belongsTo(models.people, {as: 'ItemCuratorPlus' ,foreignKey: 'approvingCuratorId'});
		itemIdentification.belongsToMany(models.people, {as:'workers', through: 'workDoneBy', foreignKey: 'identificationId'})
// FOR ItemIdent as the START
		itemIdentification.belongsTo(models.items, {foreignKey: 'identificationId', targetKey: 'identificationId'});
		itemIdentification.hasMany(models.callNumbers, {foreignKey: 'identificationId', targetKey: 'identificationId'});
		itemIdentification.hasMany(models.workDoneBy, {foreignKey: 'identificationId', targetKey: 'identificationId'});
		itemIdentification.belongsTo(models.itemProposal, {foreignKey: 'identificationId', targetKey: 'identificationId'});
		// Test Association with Files
		itemIdentification.hasMany(models.itemFiles, {foreignKey: 'identificationId', targetKey: 'identificationId'});

	}
	return itemIdentification;
};
