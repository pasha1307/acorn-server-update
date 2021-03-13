module.exports = function(sequelize, DataTypes) {
    const Record = sequelize.define('Record', {
        recordType: {
            type: DataTypes.STRING(4),
            allowNull: false,
            defaultValue: 'item',
            field: 'RecordType'
        },
        recordId: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            defaultValue: '0',
            primaryKey: true,
            field: 'RecordID'
        },
        identificationId: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: true,
            references: {
                model: 'itemIdentification',
                key: 'identificationId'
            },
            field: 'IdentificationID'
        },
        purposeId: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: true,
            field: 'PurposeID'
        },
        homeLocationId: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: true,
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
            allowNull: true
            ,
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
            allowNull: false,
            field: 'CoordinatorID'
        },
        isNonCollectionMaterial: {
            type: DataTypes.INTEGER(1).UNSIGNED,
            allowNull: true,
            defaultValue: '0',
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
            type: DataTypes.STRING(1000),
            allowNull: true,
            field: 'CollectionName'
        },
        storage: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'Storage'
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
        }
    }, {
        tableName: 'RecordsCombined',
        timestamps: false,
    });
    Record.associate = (models) => {
        Record.belongsTo(models.projects, {foreignKey: 'ProjectID'});
        Record.belongsTo(models.itemReport, {foreignKey: 'identificationId', targetKey: 'identificationId'});
        Record.belongsTo(models.groups, {foreignKey: 'groupId', targetKey: 'groupId'});
        Record.belongsTo(models.departments, {foreignKey: 'DepartmentID'});
        Record.belongsTo(models.locations, {foreignKey: 'HomeLocationID'});
        Record.belongsTo(models.formats, {foreignKey: 'FormatID'});

        Record.belongsTo(models.people, {as: 'Coordinator', foreignKey: 'coordinatorId'});
        Record.belongsTo(models.people, {as: 'Curator', foreignKey: 'curatorId'});
        Record.belongsTo(models.people, {as: 'CuratorPlus', foreignKey: 'approvingCuratorId'});
        Record.belongsTo(models.people, {as: 'Editor', foreignKey: 'editedById'});
        Record.belongsTo(models.osw, {foreignKey: 'identificationId', targetKey: 'identificationId'});

        Record.belongsTo(models.itemProposal, {foreignKey: 'identificationId', targetKey: 'identificationId'});
        Record.belongsTo(models.purposes, {foreignKey: 'purposeId', targetKey: 'purposeId'});
        Record.belongsTo(models.chargeto, {foreignKey: 'chargeToId', targetKey: 'chargeToId'});
        Record.belongsToMany(models.items, {through: models.itemIdentification, foreignKey: 'identificationId', targetKey: 'identificationId'});
        Record.belongsTo(models.itemIdentification, {foreignKey: 'identificationId', targetKey: 'identificationId'});
    }
    return Record;
};
