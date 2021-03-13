module.exports = {
    async update(ctx) {
        try {
            const mainRecord = await ctx.db.Record.update({
                purposeId: ctx.request.body.record.data.purposeId,
                title: ctx.request.body.record.data.title,
                homeLocationId: ctx.request.body.record.data.homeLocationId,
                chargeToId: ctx.request.body.record.data.chargeToId,
                departmentId: ctx.request.body.record.data.departmentId,
                groupId: ctx.request.body.record.data.groupId,
                projectId: ctx.request.body.record.data.projectId,
                comments: ctx.request.body.record.data.comments,
                curatorId: ctx.request.body.record.data.curatorId,
                approvingCuratorId: ctx.request.body.record.data.curatorId,
                formatId: ctx.request.body.record.data.formatId,
                coordinatorId: ctx.request.body.record.data.coordinatorId,
                isBeingEdited: 1

            }, {
                where: { recordId: ctx.params.id}
            });
            const currentRecord = await ctx.db.Record.findOne({
                where: {recordId: ctx.params.id},
                order: [['recordId', 'DESC']],
                include: [
                    {model: ctx.db.osw,
                        attributes: ['oswid', 'proposedHours', 'workStartDate', 'workEndDate', 'formatId', 'workLocationId'],
                        include: [
                            {model: ctx.db.workTypes},
                            {model: ctx.db.workDone}
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
                            {model: ctx.db.callNumbers},
                            {
                                model: ctx.db.items,
                                attributes: ['ItemID', 'identificationId'],
                                include: [
                                    {model: ctx.db.initialCounts}
                                ]
                            },
                        ]}
                ]


            })
            const initItem = await ctx.db.itemIdentification.update({
                purposeId: currentRecord.purposeId,
                homeLocationId: currentRecord.homeLocationId,
                title: currentRecord.title,
                departmentId: currentRecord.departmentId,
                groupId: currentRecord.groupId,
                projectId: currentRecord.projectId,
                comments: currentRecord.comments,
                isBeingEdited: 1,
                curatorId: currentRecord.curatorId,
                approvingCuratorId: ctx.request.body.record.data.curatorId,
                chargeToId: currentRecord.chargeToId
            }, {
                where: {
                    identificationId: currentRecord.identificationId
                }

            });
            const item = await ctx.db.items.update({
                formatId: currentRecord.formatId,
                coordinatorId:  currentRecord.coordinatorId,
                fundMemo:  currentRecord.fundMemo
            }, {
                where: {
                    identificationId: currentRecord.identificationId
                },

            });
            const delCallNumbers = ctx.db.callNumbers.destroy({
                where: {
                    identificationId: currentRecord.identificationId
                }
            });
            const callNumbers = await ctx.request.body.record.callNumbers.map(el => {
                ctx.db.callNumbers.create({
                    callNumber: el.callNumber,
                    identificationId: currentRecord.identificationId
                })
            });

            const OSW = await ctx.db.osw.update({
                proposedHours: ctx.request.body.record.data.proposedHours,
                workStartDate: ctx.request.body.record.data.workStartDate,
                workEndDate: ctx.request.body.record.data.workEndDate,
                formatId: ctx.request.body.record.data.formatId,
                workLocationId: ctx.request.body.record.data.workLocationId
            }, {
                where: {
                    identificationId: currentRecord.identificationId,
                }
            });

            const currentOsw = await ctx.db.osw.findOne({
                where: {
                    identificationId: currentRecord.identificationId
                }
            });

            const oswWorkTypes = await ctx.db.oswWorkTypes.update({
                workTypeId: ctx.request.body.record.data.workTypeId
            }, {
                where: {
                    oswid: currentOsw.oswid
                }
            });
            const delWorkDone = await ctx.db.workDone.destroy({
                where: {
                    oswid: currentRecord.osw.oswid
                }
            });
            const workDone = await ctx.request.body.users.map(el => {
                ctx.db.workDone.create({
                    oswid: currentRecord.osw.oswid,
                    personId: el.personId,
                    dateCompleted: el.dateCompleted,
                    completedHours: el.completedHours
                })
            });

            const currItem = await ctx.db.items.findOne({
                where: {
                    identificationId: currentRecord.identificationId
                }
            });
            const volUpdate = await ctx.db.initialCounts.update({
                itemId: currItem.itemId,
                countType: 'Volumes',
                totalCount: ctx.request.body.record.data.volumeCount,
                description: ctx.request.body.record.data.volumeDescription
            },{
                where: {
                    countType: 'Volumes',
                    itemId: currItem.itemId
                }
            });
            const shUpdate = await ctx.db.initialCounts.update({
                itemId: currItem.itemId,
                countType: 'Sheets',
                totalCount: ctx.request.body.record.data.sheetCount,
                description: ctx.request.body.record.data.sheetDescription
            },{
                where: {
                    itemId: currItem.itemId,
                    countType: 'Sheets'
                }
            });
            const photoUpdate = await ctx.db.initialCounts.update({
                itemId: currItem.itemId,
                countType: 'Photos',
                totalCount: ctx.request.body.record.data.photoCount,
                description: ctx.request.body.record.data.photoDescription
            },{
                where: {
                    itemId: currItem.itemId,
                    countType: 'Photos'
                }
            });
            const otherUpdate = await ctx.db.initialCounts.update({
                itemId: currItem.itemId,
                countType: 'Other',
                totalCount: ctx.request.body.record.data.otherCount,
                description: ctx.request.body.record.data.otherDescription
            },{
                where: {
                    itemId: currItem.itemId,
                    countType: 'Other'
                }
            });
            const housingUpdate = await ctx.db.initialCounts.update({
                itemId: currItem.itemId,
                countType: 'Housing',
                totalCount: ctx.request.body.record.data.housingCount,
                description: ctx.request.body.record.data.housingDescription
            },{
                where: {
                    itemId: currItem.itemId,
                    countType: 'Housing'
                }
            });
            const boxUpdate = await ctx.db.initialCounts.update({
                itemId: currItem.itemId,
                countType: 'Boxes',
                totalCount: ctx.request.body.record.data.boxesCount,
                description: ctx.request.body.record.data.boxesDescription
            },{
                where: {
                    itemId: currItem.itemId,
                    countType: 'Boxes'
                }
            });
            // const currentOsw = await ctx.db.osw.findOne({
            //     where: {
            //         identificationId: currentRecord.identificationId
            //     }
            // });

            ctx.body = [ mainRecord, initItem, item, workDone];
            // result === 0 ? ctx.throw(500, 'invalid number for update') : ctx.body = `The record with the ID ${ctx.params.id} is updated`
        }
        catch (e) {
            ctx.throw(500,e);
        }
    }
}
