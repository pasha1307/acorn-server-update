module.exports = function(sequelize, DataTypes) {
	const itemProposal = sequelize.define('itemProposal', {
		proposalId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
            autoIncrement:true,
			allowNull: false,
			primaryKey: true,
			field: 'ProposalID'
		},
		identificationId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			references: {
				model: 'ItemIdentification',
				key: 'identificationId'
			},
			field: 'IdentificationID'
		},
		proposalDate: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			field: 'ProposalDate'
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'Description'
		},
		condition: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'Condition'
		},
		treatment: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'Treatment'
		},
		minimumProposedHours: {
			type: DataTypes.DECIMAL,
			allowNull: false,
			field: 'MinimumProposedHours'
		},
		maximumProposedHours: {
			type: DataTypes.DECIMAL,
			allowNull: false,
			field: 'MaximumProposedHours'
		},
		height: {
			type: DataTypes.DECIMAL,
			allowNull: true,
			field: 'Height'
		},
		width: {
			type: DataTypes.DECIMAL,
			allowNull: true,
			field: 'Width'
		},
		thickness: {
			type: DataTypes.DECIMAL,
			allowNull: true,
			field: 'Thickness'
		},
		dimensionUnit: {
			type: DataTypes.ENUM('cm','in'),
			allowNull: true,
			field: 'DimensionUnit'
		},
		examDate: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			field: 'ExamDate'
		},
		examLocationId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			references: {
				model: 'Locations',
				key: 'locationid'
			},
			field: 'ExamLocationID'
		}
	}, {
		tableName: 'ItemProposal',
        timestamps: false
	});
	itemProposal.associate = models => {
		itemProposal.belongsToMany(models.people, { through: 'proposedBy', foreignKey: 'proposalId' })
		itemProposal.hasMany(models.proposalApprovalHistory, { foreignKey: 'pkid'});
		itemProposal.hasMany(models.files, { foreignKey: 'pkid'});
		itemProposal.belongsTo(models.Record, {foreignKey: 'identificationId', targetKey: 'identificationId'});
		itemProposal.belongsTo(models.itemIdentification, {foreignKey: 'identificationId'});
		itemProposal.belongsTo(models.locations, {foreignKey: 'examLocationId', targetKey: 'locationId'});
	};
	return itemProposal;
};
