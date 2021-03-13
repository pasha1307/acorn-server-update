/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('recordsAll', {
		recordType: {
			type: DataTypes.STRING(4),
			allowNull: false,
			defaultValue: '',
			field: 'RecordType'
		},
		recordId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			defaultValue: '0',
			field: 'RecordID'
		},
		identificationId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			defaultValue: '0',
			field: 'IdentificationID'
		},
		purposeId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			defaultValue: '0',
			field: 'PurposeID'
		},
		homeLocationId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			defaultValue: '0',
			field: 'HomeLocationID'
		},
		chargeToId: {
			type: DataTypes.STRING(50),
			allowNull: true,
			field: 'ChargeToID'
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
			field: 'GroupID'
		},
		projectId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			field: 'ProjectID'
		},
		comments: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'Comments'
		},
		inactive: {
			type: DataTypes.INTEGER(3).UNSIGNED,
			allowNull: true,
			field: 'Inactive'
		},
		editCounter: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			field: 'EditCounter'
		},
		nonDigitalImagesExist: {
			type: DataTypes.INTEGER(3).UNSIGNED,
			allowNull: true,
			field: 'NonDigitalImagesExist'
		},
		isBeingEdited: {
			type: DataTypes.INTEGER(3).UNSIGNED,
			allowNull: true,
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
			field: 'CuratorID'
		},
		approvingCuratorId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			field: 'ApprovingCuratorID'
		},
		formatId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			field: 'FormatID'
		},
		coordinatorId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			field: 'CoordinatorID'
		},
		isNonCollectionMaterial: {
			type: DataTypes.BIGINT,
			allowNull: true,
			field: 'IsNonCollectionMaterial'
		},
		expectedDateOfReturn: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			field: 'ExpectedDateOfReturn'
		},
		insuranceValue: {
			type: DataTypes.DECIMAL,
			allowNull: true,
			field: 'InsuranceValue'
		},
		fundMemo: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'FundMemo'
		},
		authorArtist: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'AuthorArtist'
		},
		dateOfObject: {
			type: DataTypes.STRING(50),
			allowNull: true,
			field: 'DateOfObject'
		},
		hollisNumber: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			field: 'HOLLISNumber'
		},
		collectionName: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'CollectionName'
		},
		storage: {
			type: DataTypes.STRING(255),
			allowNull: true,
			field: 'Storage'
		},
		manuallyClosed: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			field: 'ManuallyClosed'
		},
		manuallyClosedDate: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'ManuallyClosedDate'
		}
	}, {
		tableName: 'RecordsAll'
	});
};
