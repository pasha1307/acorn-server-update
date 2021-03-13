module.exports = {
    async create(ctx) {
        try {
            const group = await ctx.db.groups.create({
                groupName: ctx.request.body[0].data.groupName,
                projectId: ctx.request.body[0].data.projectId
            });
            const initId = await ctx.db.itemIdentification.create({
                purposeId: ctx.request.body[0].data.purposeId,
                homeLocationId: ctx.request.body[0].data.homeLocationId,
                departmentId: ctx.request.body[0].data.departmentId,
                title: ctx.request.body[0].data.title,
                groupId: group.groupId,
                projectId: ctx.request.body[0].data.projectId,
                comments: ctx.request.body[0].data.comments,
                editCounter: ctx.request.body[0].data.editCounter,
                curatorId: ctx.request.body[0].data.curatorId,
                approvingCuratorId: ctx.request.body[0].data.approvingCuratorId,
                chargeToId: ctx.request.body[0].data.chargeToId
            });
            const initItem = await ctx.db.items.create({
                formatId: ctx.request.body[0].data.formatId,
                identificationId: initId.identificationId,
                coordinatorId: ctx.request.body[0].data.coordinatorId,
                isNonCollectionMaterial: ctx.request.body[0].data.isNonCollectionMaterial,
                insuranceValue: ctx.request.body[0].data.insuranceValue,
                fundMemo: ctx.request.body[0].data.fundMemo,
                authorArtist: ctx.request.body[0].data.authorArtist,
                dateOfObject: ctx.request.body[0].data.dateOfObject,
                editCounter: ctx.request.body[0].data.editCounter,
                collectionName: ctx.request.body[0].data.collectionName,
                storage: ctx.request.body[0].data.storage,
                expectedDateOfReturn: ctx.request.body[0].data.expectedDateOfReturn
            });

            const Item = await ctx.request.body.map((el, index) => {
                ctx.db.itemIdentification.create({
                    identificationId: initId.identificationId + index,
                    purposeId: el.data.purposeId,
                    homeLocationId: el.data.homeLocationId,
                    departmentId: el.data.departmentId,
                    title: el.data.title,
                    groupId: group.groupId,
                    projectId: el.data.projectId,
                    comments: el.data.comments,
                    editCounter: el.data.editCounter,
                    curatorId: el.data.curatorId,
                    approvingCuratorId: el.data.approvingCuratorId,
                    chargeToId: el.data.chargeToId,
                })
                ctx.db.items.create({
                    itemId: initItem.itemId + index,
                    formatId: el.data.formatId,
                    identificationId: initId.identificationId + index,
                    coordinatorId: el.data.coordinatorId,
                    isNonCollectionMaterial: el.data.isNonCollectionMaterial,
                    insuranceValue: el.data.insuranceValue,
                    fundMemo: el.data.fundMemo,
                    authorArtist: el.data.authorArtist,
                    dateOfObject: el.data.dateOfObject,
                    editCounter: el.data.editCounter,
                    collectionName: el.data.collectionName,
                    storage: el.data.storage,
                    expectedDateOfReturn: el.data.expectedDateOfReturn
                });
                ctx.db.initialCounts.create({
                    itemId: initItem.itemId + index,
                    countType: 'Volumes',
                    totalCount: el.data.volumeCount || 0,
                    description: el.data.volumeDescription
                }, {
                    where: {
                        countType: 'Volumes',
                        itemId: initItem.itemId + index
                    }
                });

                ctx.db.initialCounts.create({
                    itemId: initItem.itemId + index,
                    countType: 'Sheets',
                    totalCount: el.data.sheetCount || 0,
                    description: el.data.sheetDescription
                }, {
                    where: {
                        countType: 'Sheets',
                        itemId: initItem.itemId + index
                    }
                });
                ctx.db.initialCounts.create({
                    itemId: initItem.itemId + index,
                    countType: 'Photos',
                    totalCount: el.data.photoCount ||0,
                    description: el.data.photoDescription
                }, {
                    where: {
                        countType: 'Photos',
                        itemId: initItem.itemId + index
                    }
                });
                ctx.db.initialCounts.create({
                    itemId: initItem.itemId + index,
                    countType: 'Other',
                    totalCount: el.data.otherCount || 0,
                    description: el.data.otherDescription
                }, {
                    where: {
                        countType: 'Other',
                        itemId: initItem.itemId + index
                    }
                });
                ctx.db.initialCounts.create({
                    itemId: initItem.itemId + index,
                    countType: 'Housing',
                    totalCount: el.data.housingCount || 0,
                    description: el.data.housingDescription
                }, {
                    where: {
                        countType: 'Housing',
                        itemId: initItem.itemId + index
                    }
                });
                ctx.db.initialCounts.create({
                    itemId: initItem.itemId + index,
                    countType: 'Boxes',
                    totalCount: el.data.boxesCount || 0,
                    description: el.data.boxesDescription
                }, {
                    where: {
                        countType: 'Boxes',
                        itemId: initItem.itemId + index
                    }
                });
                el.callNumbers.map(x => {
                    ctx.db.callNumbers.create({
                        callNumber: x,
                        identificationId: initId.identificationId + index,
                    })
                });
                el.users.map(x => {
                    ctx.db.workAssignedTo.create({
                        personId: x,
                        itemId: initItem.itemId + index
                    })
                });
                ctx.db.Record.create({
                    recordType: el.data.recordType,
                    identificationId: initId.identificationId + index,
                    purposeId: el.data.purposeId,
                    homeLocationId: el.data.homeLocationId,
                    chargeToId: el.data.chargeToId,
                    title: el.data.recordTitle,
                    groupId: group.groupId,
                    projectId: el.data.projectId,
                    comments: el.data.comments,
                    editCounter: el.data.editCounter,
                    curatorId: el.data.curatorId,
                    approvingCuratorId: el.data.approvingCuratorId,
                    collectionName: el.data.collectionName,
                    formatId: el.data.formatId,
                    coordinatorId: el.data.coordinatorId,
                    isNonCollectionMaterial: el.data.isNonCollectionMaterial,
                    expectedDateOfReturn: el.data.expectedDateOfReturn,
                    insuranceValue: el.data.insuranceValue,
                    fundMemo: el.data.fundMemo,
                    authorArtist: el.data.authorArtist,
                    dateOfObject: el.data.dateOfObject,
                    storage: el.data.storage
                })
            });


            ctx.body = [group.groupId, initId.identificationId, initItem.itemId, Item];
        } catch (err) {
            ctx.throw(500, err)
        }
    }
};

// const Ident = await ctx.request.body.map((el, index) => {
//     ctx.db.itemIdentification.create({
//         identificationId: initId.identificationId + index,
//         purposeId: el.data.purposeId,
//         homeLocationId: el.data.homeLocationId,
//         departmentId: el.data.departmentId,
//         title: el.data.title,
//         groupId: group.groupId,
//         projectId: el.data.projectId,
//         comments: el.data.comments,
//         editCounter: el.data.editCounter,
//         curatorId: el.data.curatorId,
//         approvingCuratorId: el.data.approvingCuratorId,
//         chargeToId: el.data.chargeToId,
//     })
// });

// ctx.db.initialCounts.bulkCreate([
//     {
//         itemId: initItem.itemId + index,
//         countType: 'Volumes',
//         totalCount: el.data.volumeCount || 0,
//         description: el.data.volumeDescription
//
//     },
//     {
//         itemId: initItem.itemId + index,
//         countType: 'Sheets',
//         totalCount: el.data.sheetCount || 0,
//         description: el.data.sheetDescription
//     },
//     {
//         itemId: initItem.itemId + index,
//         countType: 'Photos',
//         totalCount: el.data.photoCount ||0,
//         description: el.data.photoDescription
//     },
//     {
//         itemId: initItem.itemId + index,
//         countType: 'Other',
//         totalCount: el.data.otherCount || 0,
//         description: el.data.otherDescription
//     },
//     {
//         itemId: initItem.itemId + index,
//         countType: 'Housing',
//         totalCount: el.data.housingCount || 0,
//         description: el.data.housingDescription
//     },
//     {
//         itemId: initItem.itemId + index,
//         countType: 'Boxes',
//         totalCount: el.data.boxesCount || 0,
//         description: el.data.boxesDescription
//     }
// ]);
// const callNums = await ctx.request.body.map((el, index) => {
//     el.callNumbers.map(x => {
//         ctx.db.callNumbers.create({
//             callNumber: x,
//             identificationId: initId.identificationId + index,
//         })
//     })
// });
// const wat = await ctx.request.body.map((el, index) => {
//     el.users.map(x => {
//         ctx.db.workAssignedTo.create({
//             personId: x,
//             itemId: initItem.itemId + index
//         })
//     })
// });

// const Record = await ctx.request.body.map((el, index) => {
//     ctx.db.Record.create({
//         recordType: el.data.recordType,
//         identificationId: initId.identificationId + index,
//         purposeId: el.data.purposeId,
//         homeLocationId: el.data.homeLocationId,
//         chargeToId: el.data.chargeToId,
//         title: el.data.recordTitle,
//         groupId: group.groupId,
//         projectId: el.data.projectId,
//         comments: el.data.comments,
//         editCounter: el.data.editCounter,
//         curatorId: el.data.curatorId,
//         approvingCuratorId: el.data.approvingCuratorId,
//         collectionName: el.data.collectionName,
//         formatId: el.data.formatId,
//         coordinatorId: el.data.coordinatorId,
//         isNonCollectionMaterial: el.data.isNonCollectionMaterial,
//         expectedDateOfReturn: el.data.expectedDateOfReturn,
//         insuranceValue: el.data.insuranceValue,
//         fundMemo: el.data.fundMemo,
//         authorArtist: el.data.authorArtist,
//         dateOfObject: el.data.dateOfObject,
//         storage: el.data.storage
//     })
// })

// ctx.db.initialCounts.create({
//     itemId: initItem.itemId + index,
//     totalCount: el.data.volumeCount || 0,
//     description: el.data.volumeDescription
// }, {
//     where: {
//         countType: 'Volumes'
//     }
// });
//
// ctx.db.initialCounts.create({
//     itemId: initItem.itemId + index,
//     totalCount: el.data.sheetCount || 0,
//     description: el.data.sheetDescription
// }, {
//     where: {
//         countType: 'Sheets'
//     }
// });
// ctx.db.initialCounts.create({
//     itemId: initItem.itemId + index,
//     totalCount: el.data.photoCount ||0,
//     description: el.data.photoDescription
// }, {
//     where: {
//         countType: 'Photos'
//     }
// });
// ctx.db.initialCounts.create({
//     itemId: initItem.itemId + index,
//     totalCount: el.data.otherCount || 0,
//     description: el.data.otherDescription
// }, {
//     where: {
//         countType: 'Other'
//     }
// });
// ctx.db.initialCounts.create({
//     itemId: initItem.itemId + index,
//     totalCount: el.data.housingCount || 0,
//     description: el.data.housingDescription
// }, {
//     where: {
//         countType: 'Housing'
//     }
// });
// ctx.db.initialCounts.create({
//     itemId: initItem.itemId + index,
//     totalCount: el.data.boxesCount || 0,
//     description: el.data.boxesDescription
// }, {
//     where: {
//         countType: 'Boxes'
//     }
// });
