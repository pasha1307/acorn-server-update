module.exports = {
    async find(ctx) {
        try {
            ctx.body = await ctx.db.groups.findAll({
                // where: {inactive: 0},
                attributes: ['groupId', 'groupName', 'inactive'],
                order: [['groupId', 'DESC']],
                include: [
                    {
                        model: ctx.db.Record,
                        include: [
                            {model: ctx.db.osw,
                                attributes: ['oswid', 'proposedHours', 'workStartDate', 'workEndDate', 'formatId'],
                                include: [{
                                    model: ctx.db.workTypes
                                }]
                            },
                            {model: ctx.db.people, as: 'Coordinator', attributes: ['PersonID','DisplayName' ]},
                            {model: ctx.db.people, as: 'Curator', attributes: ['PersonID','DisplayName' ]},
                            {model: ctx.db.people, as: 'CuratorPlus', attributes: ['PersonID','DisplayName' ]},
                            {model: ctx.db.people, as: 'Editor', attributes: ['PersonID','DisplayName' ]},
                            {model: ctx.db.purposes, attributes: ['Purpose']},
                            {model: ctx.db.formats, attributes: ['Format']},
                            {model: ctx.db.groups, attributes: ['GroupName']},
                            {model: ctx.db.projects, attributes: ['ProjectName']},
                            {model: ctx.db.locations, attributes: ['Location', 'isWorkLocation']},
                            {model: ctx.db.departments, attributes: ['DepartmentName']},
                            {model: ctx.db.itemIdentification,
                                attributes: ['identificationId', 'Title'],
                                include:[
                                    {model: ctx.db.callNumbers},
                                    {
                                        model: ctx.db.items,
                                        attributes: ['ItemID', 'identificationId'],
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
                    }
                ]
            })
        }
        catch (err) {
            ctx.throw(500, ctx.err)
        }
    }
}

