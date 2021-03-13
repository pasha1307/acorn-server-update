module.exports = {
    async findOne(ctx) {
        try {
            ctx.body = await ctx.db.Record.findOne({
                where: {recordId: ctx.params.id},
                order: [['recordId', 'DESC']],
                        include: [
                            {model: ctx.db.osw,
                                attributes: ['oswid', 'proposedHours', 'workStartDate', 'workEndDate', 'formatId', 'workLocationId'],
                                include: [
                                    {model: ctx.db.workDone},
                                    {model: ctx.db.workTypes}
                                    ]
                            },
                            // {
                            //     model: ctx.db.itemProposal,
                            //     include: [
                            //         {
                            //             model: ctx.db.files,
                            //             attributes: ['fileId', 'path'],
                            //             include: [
                            //                 {model: ctx.db.people, as: 'person', attributes:['personId', 'displayName']}
                            //             ]
                            //         },
                            //     ]
                            // },
                            // {model: ctx.db.itemReport},
                            {model: ctx.db.people, as: 'Coordinator', attributes: ['PersonID','DisplayName', 'EmailAddress' ]},
                            {model: ctx.db.people, as: 'Curator', attributes: ['PersonID','DisplayName', 'EmailAddress' ]},
                            {model: ctx.db.people, as: 'CuratorPlus', attributes: ['PersonID','DisplayName', 'EmailAddress']},
                            {model: ctx.db.people, as: 'Editor', attributes: ['PersonID','DisplayName' ]},
                            {model: ctx.db.purposes, attributes: ['Purpose']},
                            {model: ctx.db.formats, attributes: ['Format']},
                            {model: ctx.db.groups, attributes: ['GroupName']},
                            {model: ctx.db.projects, attributes: ['ProjectName']},
                            {model: ctx.db.locations, attributes: ['Location', 'isWorkLocation']},
                            {model: ctx.db.departments, attributes: ['DepartmentName']},
                            {model: ctx.db.itemIdentification,
                                // attributes: ['identificationId', 'Title'],
                                include:[
                                    {
                                        model: ctx.db.itemFiles,
                                        attributes: ['fileId','path', 'description', 'fileName', 'dateEntered', 'enteredById'],
                                        include: [{model: ctx.db.people, attributes: ['displayName']}]
                                    },
                                    {model: ctx.db.callNumbers},
                                    {
                                        model: ctx.db.itemProposal,
                                        include: [
                                            {
                                                model: ctx.db.files,
                                                attributes: ['fileId', 'path'],
                                                include: [
                                                    {model: ctx.db.people, as: 'person', attributes:['personId', 'displayName']}
                                                ]
                                            },
                                        ]
                                    },
                                    {model: ctx.db.people, as: 'workers', attributes: ['personId','locationId','inactive','accessLevel','displayName', 'sortName','emailAddress']},
                                    {
                                        model: ctx.db.items,
                                        // attributes: ['ItemID', 'identificationId'],
                                        include: [
                                            {
                                                model: ctx.db.workAssignedTo,
                                                include: [
                                                    {
                                                        model: ctx.db.people,
                                                        attributes: ['personId', 'displayName']
                                                    }

                                                ]
                                            },
                                            {model: ctx.db.initialCounts}
                                        ]
                                    },
                                ]}
                        ]


            })
        }
        catch (err) {
            ctx.throw(500, ctx.err)
        }
    }
}
