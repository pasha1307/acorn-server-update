module.exports = {
    async find(ctx) {
        try {

            ctx.body = await ctx.db.Record.findAll({
                order: [['recordId', 'DESC']],
                limit: 200,
                attributes: [
                    'identificationId',
                    'recordType','recordId',
                    'purposeId',
                    'homeLocationId',
                    'chargeToId',
                    'title',
                    'departmentId',
                    'groupId',
                    'projectId',
                    'comments',
                    'inactive',
                    'editCounter',
                    'nonDigitalImagesExist',
                    'isBeingEdited',
                    'editedById',
                    'curatorId',
                    'approvingCuratorId',
                    'formatId',
                    'coordinatorId',
                    'isNonCollectionMaterial',
                    'expectedDateOfReturn',
                    'insuranceValue',
                    'fundMemo',
                    'authorArtist',
                    'dateOfObject',
                    'hollisNumber',
                    'storage',
                    'manuallyClosed',
                    'manuallyClosedDate',
                ],
                include: [
                    {model: ctx.db.itemReport, attributes: ['reportId']},
                    {model: ctx.db.osw,
                        attributes: ['oswid', 'proposedHours', 'workStartDate', 'workEndDate', 'formatId', 'workLocationId'],
                        include: [
                            {model: ctx.db.workTypes},
                            {model: ctx.db.locations, attributes: ['locationId', 'location']},
                            {model: ctx.db.workDone}
                            ]
                    },
                    {
                        model: ctx.db.itemProposal,
                        attributes: ['proposalId'],
                        include: [
                            { model: ctx.db.people, attributes: ['PersonID', 'DisplayName']},
                            {
                                model: ctx.db.proposalApprovalHistory,
                                include: [
                                    {
                                        model: ctx.db.people, as: 'PropApprover',
                                        attributes: ['personId','displayName','accessLevel', 'emailAddress']
                                    }
                                ]
                            },
                        ]
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
                            // {model: ctx.db.itemFiles, attributes: ['fileName']},
                            {model: ctx.db.callNumbers},
                            {model: ctx.db.people, as: 'workers', attributes: ['personId','locationId','inactive','accessLevel','displayName', 'sortName','emailAddress']},
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
            })
        }
        catch (err) {
            ctx.throw(500, err);
        }
    }
}
