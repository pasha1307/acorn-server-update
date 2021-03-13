module.exports = {
    async update(ctx) {
        try {
            const mainRecord = await ctx.db.Record.update({
                recordType: 'Item',
                purposeId: ctx.request.body.data.purposeId,
                homeLocationId: ctx.request.body.data.homeLocationId,
                chargeToId: ctx.request.body.data.chargeToId,
                title: ctx.request.body.data.recordTitle,
                departmentId: ctx.request.body.data.departmentId,
                groupId: ctx.request.body.data.groupId,
                projectId: ctx.request.body.data.projectId,
                comments: ctx.request.body.data.comments,
                inactive: ctx.request.body.data.inactive,
                nonDigitalImagesExist: 0,
                isBeingEdited: 1,
                editedBy: ctx.request.body.data.coordinatorId,
                curatorId: ctx.request.body.data.curatorId,
                approvingCuratorId: ctx.request.body.data.approvingCuratorId,
                formatId: ctx.request.body.data.formatId,
                coordinatorId: ctx.request.body.data.coordinatorId,
                isNonCollectionMaterial: ctx.request.body.data.isNonCollectionMaterial,
                expectedDateOfReturn: ctx.request.body.data.expectedDateOfReturn,
                insuranceValue: ctx.request.body.data.insuranceValue,
                fundMemo: ctx.request.body.data.fundMemo,
                authorArtist: ctx.request.body.data.authorArtist,
                dateOfObject: ctx.request.body.data.dateOfObject,
                hollisNumber: ctx.request.body.data.hollisNumber,
                collectionName: ctx.request.body.data.collectionName,
                storage: ctx.request.body.data.storage
            }, {
                where: { recordId: ctx.params.id}
            });

            const currentRecord = await ctx.db.Record.findOne({
                where: {recordId: ctx.params.id},
                // attributes: ['RecordType', 'RecordID', 'IdentificationID'],
                include: [
                    // {model: ctx.db.osw,
                    //     attributes: ['oswid', 'proposedHours', 'workStartDate', 'workEndDate', 'formatId'],
                    //     include: [{
                    //         model: ctx.db.workTypes
                    //     }]
                    // },
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
                        attributes: ['identificationId', 'title', 'comments'],
                        include:[
                            {model: ctx.db.callNumbers},
                            {
                                model: ctx.db.items,
                                attributes: ['ItemID', 'identificationId', 'collectionName'],
                                include: [
                                    {model: ctx.db.workAssignedTo},
                                    {model: ctx.db.initialCounts}
                                ]
                            },
                        ]}
                ],

            });

            const initItem = await ctx.db.itemIdentification.update({
                purposeId: ctx.request.body.data.purposeId,
                homeLocationId: ctx.request.body.data.homeLocationId,
                title: ctx.request.body.data.title,
                departmentId: ctx.request.body.data.departmentId,
                groupId: ctx.request.body.data.groupId,
                projectId: ctx.request.body.data.projectId,
                comments: ctx.request.body.data.comments,
                nonDigitalImagesExist: ctx.request.body.data.editCounter,
                isBeingEdited: 1,
                editedById: ctx.request.body.data.coordinatorId,
                curatorId: ctx.request.body.data.curatorId,
                approvingCuratorId: ctx.request.body.data.approvingCuratorId,
                chargeToId: ctx.request.body.data.chargeToId
            }, {
                where: {
                    identificationId: currentRecord.identificationId
                },

            });

            const item = await ctx.db.items.update({
                formatId: ctx.request.body.data.formatId,
                coordinatorId: ctx.request.body.data.coordinatorId,
                isNonCollectionMaterial: ctx.request.body.data.isNonCollectionMaterial,
                insuranceValue: ctx.request.body.data.insuranceValue,
                fundMemo: ctx.request.body.data.fundMemo,
                authorArtist: ctx.request.body.data.authorArtist,
                dateOfObject: ctx.request.body.data.dateOfObject,
                hollisNumber: ctx.request.body.data.hollisNumber,
                collectionName: ctx.request.body.data.collectionName,
                storage: ctx.request.body.data.storage,
                expectedDateOfReturn: ctx.request.body.data.expectedDateOfReturn
            }, {
                where: {
                    identificationId: initItem.identificationId
                },

            });

            const delCallNumbers = ctx.db.callNumbers.destroy({
                where: {
                    identificationId: currentRecord.identificationId
                }
            });
            // const cNum = ctx.request.body.callNumbers;
            const callNumbers = await ctx.request.body.callNumbers.map(el => {
                ctx.db.callNumbers.create({
                    callNumber: el.callNumber,
                    identificationId: currentRecord.identificationId
                })
            });

            const currItem = await ctx.db.items.findOne({
                where: {
                    identificationId: currentRecord.identificationId
                }
            });

                if (ctx.request.body.users[0].personId) {
                    ctx.db.workAssignedTo.destroy({
                        where: {
                            itemId: currItem.itemId
                        }
                    });
                    ctx.request.body.users.map(el => {
                        return ctx.db.workAssignedTo.create({
                            personId: el.personId,
                            itemId: currItem.itemId
                        }) 
                    })
                   
                } else {
                    await ctx.db.workAssignedTo.destroy({
                        where: {
                            itemId: currItem.itemId
                        }
                    });
                    await ctx.request.body.users.map( (el,index) => {
                        return ctx.db.workAssignedTo.create({
                            personId: el,
                            itemId: currItem.itemId
                        })
                    });
                }
            const volUpdate = await ctx.db.initialCounts.update({
                itemId: currItem.itemId,
                countType: 'Volumes',
                totalCount: ctx.request.body.data.volumeCount,
                description: ctx.request.body.data.volumeDescription
            },{
                where: {
                    countType: 'Volumes'
                }
            })
            const shUpdate = await ctx.db.initialCounts.update({
                itemId: currItem.itemId,
                countType: 'Sheets',
                totalCount: ctx.request.body.data.sheetCount,
                description: ctx.request.body.data.sheetDescription
            },{
                where: {
                    itemId: currItem.itemId,
                    countType: 'Sheets'
                }
            })
            const photoUpdate = await ctx.db.initialCounts.update({
                itemId: currItem.itemId,
                countType: 'Photos',
                totalCount: ctx.request.body.data.photoCount,
                description: ctx.request.body.data.photoDescription
            },{
                where: {
                    itemId: currItem.itemId,
                    countType: 'Photos'
                }
            })
            const otherUpdate = await ctx.db.initialCounts.update({
                itemId: currItem.itemId,
                countType: 'Other',
                totalCount: ctx.request.body.data.otherCount,
                description: ctx.request.body.data.otherDescription
            },{
                where: {
                    itemId: currItem.itemId,
                    countType: 'Other'
                }
            })
            const housingUpdate = await ctx.db.initialCounts.update({
                itemId: currItem.itemId,
                countType: 'Housing',
                totalCount: ctx.request.body.data.housingCount,
                description: ctx.request.body.data.housingDescription
            },{
                where: {
                    itemId: currItem.itemId,
                    countType: 'Housing'
                }
            })
            const boxUpdate = await ctx.db.initialCounts.update({
                itemId: currItem.itemId,
                countType: 'Boxes',
                totalCount: ctx.request.body.data.boxesCount,
                description: ctx.request.body.data.boxesDescription
            },{
                where: {
                    itemId: currItem.itemId,
                    countType: 'Boxes'
                }
            })

            ctx.body = [
                ...mainRecord,
                ...initItem,
                ...item,
                ...callNumbers,
                currentRecord,
                ...volUpdate,
                ...shUpdate,
                ...photoUpdate,
                ...otherUpdate,
                ...housingUpdate,
                ...boxUpdate]
            ;
            // result === 0 ? ctx.throw(500, 'invalid number for update') : ctx.body = `The record with the ID ${ctx.params.id} is updated`
        }
        catch (e) {
            ctx.throw(500,e);
        }
    }
}
