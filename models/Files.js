module.exports = function(sequelize, DataTypes) {
	const files = sequelize.define('files', {
		fileId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
            autoIncrement:true,
			allowNull: false,
			primaryKey: true,
			field: 'FileID'
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
			references: {
				model: 'People',
				key: 'personid'
			},
			field: 'EnteredByID'
		},
		drsBatchName: {
			type: DataTypes.STRING(500),
			allowNull: true,
			field: 'DRSBatchName'
		}
	}, {
		tableName: 'Files',
        timestamps: false
	});
	files.associate = models => {
		files.belongsTo(models.people, {foreignKey: 'enteredById', targetKey: 'personId'})
	}
	return files;
};
