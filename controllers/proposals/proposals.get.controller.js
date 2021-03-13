module.exports = {
    async find(ctx) {
        try {
            ctx.body = await ctx.db.itemProposal.findAll({
                order: [['proposalId', 'DESC']],
                limit: 120,
                include: [
                    {model: ctx.db.locations, attributes: ['Location']},
                    {
                        model: ctx.db.Record,
                        attributes: [
                            'identificationId',
                            'recordType','recordId',
                            'title',
                            'groupId',
                            'projectId',
                            'comments',
                            'curatorId',
                            'approvingCuratorId',
                            'formatId',
                            'coordinatorId',
                            'authorArtist',
                            'dateOfObject',
                        ],
                        include: [
                            {model: ctx.db.people, as: 'Coordinator', attributes: ['PersonID','DisplayName', 'EmailAddress' ]},
                            {model: ctx.db.people, as: 'Curator', attributes: ['PersonID','DisplayName', 'EmailAddress' ]},
                            {model: ctx.db.people, as: 'CuratorPlus', attributes: ['PersonID','DisplayName', 'EmailAddress' ]},
                            {model: ctx.db.formats, attributes: ['Format']},
                            {model: ctx.db.groups, attributes: ['GroupName']},
                            {model: ctx.db.projects, attributes: ['ProjectName']},
                        ]
                        // attributes: ['identificationId', 'recordId']
                    },
                    {model: ctx.db.itemIdentification,
                        attributes: ['identificationId', 'Title'],
                        include:[
                            {model: ctx.db.callNumbers},
                            {model: ctx.db.people, as: 'ItemCurator', attributes: ['PersonID','DisplayName', 'EmailAddress' ]},
                            {model: ctx.db.people, as: 'ItemCuratorPlus', attributes: ['PersonID','DisplayName', 'EmailAddress' ]},
                            {
                                model: ctx.db.items,
                                include: [
                                    {model: ctx.db.people, attributes: ['PersonID','DisplayName', 'EmailAddress' ]},
                                    {model: ctx.db.initialCounts}
                                ]
                            }
                        ]
                    },
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
        catch(err) {
            ctx.throw(500, err) ;
        }
    }
};
