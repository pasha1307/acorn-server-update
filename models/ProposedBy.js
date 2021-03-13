module.exports = function(sequelize, DataTypes) {
	const proposedBy = sequelize.define('proposedBy', {
		personId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'People',
				key: 'personId'
			},
			field: 'PersonID'
		},
		proposalId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'ItemProposal',
				key: 'proposalid'
			},
			field: 'ProposalID'
		}
	}, {
		tableName: 'ProposedBy',
		timestamps: false
	});
	return proposedBy
};
