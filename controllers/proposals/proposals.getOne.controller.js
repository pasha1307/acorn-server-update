module.exports = {
    async findOne(ctx) {
        try {
            ctx.body = await ctx.db.itemProposal.findOne({
                where: {
                    proposalId: ctx.params.id
                },
                include: [
                    {model: ctx.db.locations, attributes: ['Location']},
                    {model: ctx.db.Record, attributes: ['recordId']},
                    {
                        model: ctx.db.proposalApprovalHistory,
                        include: [
                            {
                                model: ctx.db.people, as: 'PropApprover',
                                attributes: ['personId','displayName','accessLevel', 'emailAddress']
                            }
                            ]
                    },
                    {model: ctx.db.people,
                        attributes: ['personId', 'displayName', 'emailAddress'],
                    }
                ]
            })
        }
        catch (err) {
            ctx.throw(500, err);
        }
    }
};
