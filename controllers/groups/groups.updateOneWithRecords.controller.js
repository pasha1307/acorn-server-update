module.exports = {
    async update(ctx) {
        try {
            const updatedGroup = await ctx.db.groups.update({
                groupName: ctx.request.body.data.groupName,
                projectId: ctx.request.body.data.projectId,
                isBeingEdited: 1,
                editedById: ctx.request.body.data.coordinatorId,
            }, {
                where: {
                    groupId: ctx.params.id
                }
            });
            const updatedRecord = await ctx.db.Record.update({
                purposeId: ctx.request.body.data.purposeId,
                homeLocationId: ctx.request.body.data.homeLocationId,
                chargeToId: ctx.request.body.data.chargeToId,
                title: ctx.request.body.data.recordTitle,
                departmentId: ctx.request.body.data.departmentId,
                groupId: ctx.request.body.data.groupId,
                projectId: ctx.request.body.data.projectId,
                comments: ctx.request.body.data.comments,
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
                collectionName: ctx.request.body.data.collectionName,
                storage: ctx.request.body.data.storage,
            }, {
                where: {
                    groupId: ctx.params.id
                }
            });
            const updatedIdent = await ctx.db.itemIdentification.update({
                purposeId: ctx.request.body.data.purposeId,
                homeLocationId: ctx.request.body.data.homeLocationId,
                title: ctx.request.body.data.title,
                departmentId: ctx.request.body.data.departmentId,
                groupId: ctx.request.body.data.groupId,
                projectId: ctx.request.body.data.projectId,
                comments: ctx.request.body.data.comments,
                isBeingEdited: 1,
                editedById: ctx.request.body.data.coordinatorId,
                curatorId: ctx.request.body.data.curatorId,
                approvingCuratorId: ctx.request.body.data.approvingCuratorId,
                chargeToId: ctx.request.body.data.chargeToId,
            }, {
                where: {
                    groupId: ctx.params.id
                }
            });
            const currIdents = await ctx.db.itemIdentification.findAll({
                where: {
                    groupId: ctx.params.id
                },
                include:[
                    {
                        model: ctx.db.items,
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
                ]
            });
            const itemIds = currIdents.map(el => el.item.itemId);
            // update workAssignedTo based on itemIds
            itemIds.map(el => {
                ctx.request.body.users.map(x => {
                    ctx.db.workAssignedTo.destroy({
                        where: {
                            itemId: el
                        }
                    })
                });
                ctx.request.body.users.map(x => {
                    ctx.db.workAssignedTo.create({
                        personId: x,
                        itemId: el
                    }, {
                        where: {
                            itemId: el
                        }
                    })
                });
                ctx.db.initialCounts.update({
                    itemId: el,
                    countType: 'Volumes',
                    totalCount: ctx.request.body.data.volumeCount || 0,
                    description: ctx.request.body.data.volumeDescription
                }, {
                    where: {
                        countType: 'Volumes',
                        itemId: el
                    }
                });
                ctx.db.initialCounts.update({
                    itemId: el,
                    countType: 'Sheets',
                    totalCount: ctx.request.body.data.sheetCount || 0,
                    description: ctx.request.body.data.sheetDescription
                }, {
                    where: {
                        countType: 'Sheets',
                        itemId: el
                    }
                });
                ctx.db.initialCounts.update({
                    itemId: el,
                    countType: 'Photos',
                    totalCount: ctx.request.body.data.photoCount || 0,
                    description: ctx.request.body.data.photoDescription
                }, {
                    where: {
                        countType: 'Photos',
                        itemId: el
                    }
                });
                ctx.db.initialCounts.update({
                    itemId: el,
                    countType: 'Other',
                    totalCount: ctx.request.body.data.otherCount || 0,
                    description: ctx.request.body.data.otherDescription
                }, {
                    where: {
                        countType: 'Other',
                        itemId: el
                    }
                });
                ctx.db.initialCounts.update({
                    itemId: el,
                    countType: 'Housing',
                    totalCount: ctx.request.body.data.housingCount || 0,
                    description: ctx.request.body.data.housingDescription
                }, {
                    where: {
                        countType: 'Housing',
                        itemId: el
                    }
                });
                ctx.db.initialCounts.update({
                    itemId: el,
                    countType: 'Boxes',
                    totalCount: ctx.request.body.data.boxesCount || 0,
                    description: ctx.request.body.data.boxesDescription
                }, {
                    where: {
                        countType: 'Boxes',
                        itemId: el
                    }

                });
            })
            // update initial counts on ItemIds
            currIdents.map((el, index) => {
                ctx.db.items.update({
                    formatId: ctx.request.body.data.formatId,
                    coordinatorId: ctx.request.body.data.coordinatorId,
                    isNonCollectionMaterial: ctx.request.body.data.isNonCollectionMaterial,
                    insuranceValue: ctx.request.body.data.insuranceValue,
                    fundMemo: ctx.request.body.data.fundMemo,
                    authorArtist: ctx.request.body.data.authorArtist,
                    dateOfObject: ctx.request.body.data.dateOfObject,
                    collectionName: ctx.request.body.data.collectionName,
                    storage: ctx.request.body.data.storage,
                    expectedDateOfReturn: ctx.request.body.data.expectedDateOfReturn,
                }, {
                    where: {
                        identificationId: el.identificationId
                    }
                })
            })

            ctx.body = [updatedGroup, updatedRecord, updatedIdent, currIdents, itemIds]
            // update Records with groupId = paramsId ref;
            // update itemIdentificcations with groupId = paramsId ref;
            // need update Items: - getItemIdentifications -> loop -> in each loop el.ite;
        }
        catch (err) {
            ctx.throw(500,err)
        }
    }
}
