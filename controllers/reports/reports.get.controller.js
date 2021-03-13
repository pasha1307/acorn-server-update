module.exports = {
    async find(ctx) {
        try {
            ctx.body = await ctx.db.itemReport.findAll({
                limit: 100,
                order: [['reportId', 'DESC']],
                include:[
                    {model: ctx.db.reportCounts},
                    {model: ctx.db.itemImportances},
                    {model: ctx.db.itemProposal,
                        attributes: ['proposalId'],
                        include: [
                            {
                                model: ctx.db.proposalApprovalHistory,
                                include: [
                                    {
                                        model: ctx.db.people, as: 'PropApprover',
                                        attributes: ['personId','displayName','accessLevel', 'emailAddress']
                                    }
                                ]
                            }],
                    },
                    {model: ctx.db.Record, attributes: ['recordId', 'title']},
                    {model: ctx.db.itemIdentification,
                        include: [
                            {model: ctx.db.callNumbers},
                            {model: ctx.db.workDoneBy, include:
                                    [{model: ctx.db.people, attributes: ['displayName']}]},
                            {model: ctx.db.items, attributes: ['authorArtist', 'formatId']},

                            ]
                    },
                    {model: ctx.db.people, as: 'workers'},
                    {model: ctx.db.locations},
                ]
            });
        }
        catch (err) {
            ctx.throw(500, err)
        }
    }

};
