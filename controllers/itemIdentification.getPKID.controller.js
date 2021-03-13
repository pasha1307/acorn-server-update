module.exports = {
    async find(ctx) {
        try {
            ctx.body = await ctx.db.itemIdentification.findAll({
                attributes: ['identificationId'],
                include: [
                    {
                        model: ctx.db.itemProposal,
                        attributes: ['identificationId', 'proposalId'],
                        where: {
                           proposalId: {
                               $ne: null
                           }
                        },
                        include: [
                            {
                              model: ctx.db.files,
                                attributes: ['fileId', 'path'],
                                include: [
                                    {model: ctx.db.people, as: 'person', attributes:['personId', 'displayName']}
                                ]
                            },
                            // {
                            //     model: ctx.db.proposalApprovalHistory,
                            //     attributes: ['pkid']
                            // }
                            ]
                    },
                ],
                order: [
                    [
                        'IdentificationId', 'DESC'
                    ]
                ],

            }) }
        catch (err) {
            ctx.throw(500, err)
        }

    }
};

