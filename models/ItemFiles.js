module.exports = function(sequelize, DataTypes) {
	const itemFiles = sequelize.define('itemFiles', {
		fileId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			field: 'FileID'
		},
		identificationId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			defaultValue: '10000',
			field: 'IdentificationID'
		},
		pkid: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			field: 'PKID'
		},
		path: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'Path'
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'Description'
		},
		fileType: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: 'Image',
			field: 'FileType'
		},
		linkType: {
			type: DataTypes.ENUM('Item','OSW','Group'),
			allowNull: false,
			defaultValue: 'Item',
			field: 'LinkType'
		},
		dateEntered: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'DateEntered'
		},
		lastModified: {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'LastModified'
		},
		fileName: {
			type: DataTypes.STRING(500),
			allowNull: false,
			field: 'FileName'
		},
		drsStatus: {
			type: DataTypes.ENUM('Pending','Complete'),
			allowNull: true,
			field: 'DRSStatus'
		},
		enteredById: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			field: 'EnteredByID'
		},
		drsBatchName: {
			type: DataTypes.STRING(500),
			allowNull: true,
			field: 'DRSBatchName'
		}
	}, {
		tableName: 'ItemFiles',
		timestamps: false
	});
	itemFiles.associate = models => {
		itemFiles.belongsTo(models.people, {foreignKey: 'enteredById', targetKey: 'personId'});
		itemFiles.belongsTo(models.itemIdentification, {foreignKey: 'identificationId', targetKey: 'identificationId'});
	}
	return itemFiles;
};
