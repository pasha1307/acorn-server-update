module.exports = function(sequelize, DataTypes) {
	const proposalApprovalHistory = sequelize.define('proposalApprovalHistory', {
		historyId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
            autoIncrement:true,
			allowNull: false,
			primaryKey: true,
			field: 'HistoryID'
		},
		pkid: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			field: 'PKID'
		},
		recordType: {
			type: DataTypes.ENUM('Item','Group'),
			allowNull: false,
			defaultValue: 'Item',
			field: 'RecordType'
		},
		activityType: {
			type: DataTypes.STRING(255),
			allowNull: false,
			field: 'ActivityType'
		},
		details: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'Details'
		},
		authorId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: 'People',
				key: 'personid'
			},
			field: 'AuthorID'
		},
		dateEntered: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			field: 'DateEntered'
		}
	}, {
		tableName: 'ProposalApprovalHistory',
		timestamps: false
	});
	proposalApprovalHistory.associate = models => {
		proposalApprovalHistory.belongsTo(models.people, {as: 'PropApprover', foreignKey: 'authorId', targetKey: 'personId'})
		proposalApprovalHistory.belongsTo(models.itemProposal, {foreignKey: 'pkid', targetKey: 'proposalId'})
	};
	return proposalApprovalHistory
};
