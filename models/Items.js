module.exports = function(sequelize, DataTypes) {
    const items = sequelize.define('items', {
        itemId: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            autoIncrement:true,
            allowNull: false,
            primaryKey: true,
            field: 'ItemID'
        },
        formatId: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: true,
            references: {
                model: 'Formats',
                key: 'formatid'
            },
            field: 'FormatID'
        },
        identificationId: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            references: {
                model: 'itemIdentification',
                key: 'identificationId'
            },
            field: 'IdentificationID'
        },
        coordinatorId: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            references: {
                model: 'people',
                key: 'personId'
            },
            field: 'CoordinatorID'
        },
        isNonCollectionMaterial: {
            type: DataTypes.INTEGER(1).UNSIGNED,
            allowNull: true,
            defaultValue: '0',
            field: 'IsNonCollectionMaterial'
        },
        fund: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'Fund'
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
        editCounter: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: true,
            field: 'EditCounter'
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
        expectedDateOfReturn: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            field: 'ExpectedDateOfReturn'
        }
    }, {
        tableName: 'Items',
		timestamps: false
    });
    items.associate = (models) => {
        items.hasMany(models.initialCounts, {foreignKey: 'itemId', targetKey: 'itemId'});
    	items.belongsTo(models.formats, {foreignKey: 'FormatID'});
    	items.belongsTo(models.people, {foreignKey: 'CoordinatorID'});
        items.belongsToMany(models.Record, {through: models.itemIdentification, foreignKey: 'identificationId', targetKey: 'identificationId'})
        items.hasMany(models.workAssignedTo, {foreignKey: 'itemId', targetKey: 'itemId'});
        // items.belongsTo(models.Record, {foreignKey: 'identificationId'});
        // items.belongsTo(models.osw, {foreignKey: 'IdentificationID'});
        // items.hasMany(models.itemIdentification, {foreignKey: 'identificationId', targetKey: 'identificationId'});
        // items.belongsTo(models.itemIdentification, {foreignKey: 'identificationId', targetKey: 'identificationId'});
	};
    return items
};
