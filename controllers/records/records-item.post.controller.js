module.exports = {
    async create(ctx) {
        try {
            const Ident = await ctx.db.itemIdentification.create({
                // identificationId: 50000,
                purposeId: ctx.request.body.data.purposeId,
                homeLocationId: ctx.request.body.data.homeLocationId,
                departmentId: ctx.request.body.data.departmentId,
                title: ctx.request.body.data.title,
                groupId: ctx.request.body.data.groupId,
                projectId: ctx.request.body.data.projectId,
                comments: ctx.request.body.data.comments,
                editCounter: ctx.request.body.data.editCounter,
                nonDigitalImagesExist: 0,
                curatorId: ctx.request.body.data.curatorId,
                approvingCuratorId: ctx.request.body.data.approvingCuratorId,
                manuallyClosed: 0,
                chargeToId: ctx.request.body.data.chargeToId
            });
            const Item = await ctx.db.items.create({
                // itemId: Ident.identificationId,
                formatId: ctx.request.body.data.formatId,
                identificationId: Ident.identificationId,
                coordinatorId: ctx.request.body.data.coordinatorId,
                isNonCollectionMaterial: ctx.request.body.data.isNonCollectionMaterial,
                fund: ctx.request.body.data.fund,
                insuranceValue: ctx.request.body.data.insuranceValue,
                fundMemo: ctx.request.body.data.fundMemo,
                authorArtist: ctx.request.body.data.authorArtist,
                dateOfObject: ctx.request.body.data.dateOfObject,
                editCounter: ctx.request.body.data.editCounter,
                hollisNumber: ctx.request.body.data.hollisNumber,
                collectionName: ctx.request.body.collectionName,
                storage: ctx.request.body.data.storage,
                expectedDateOfReturn: ctx.request.body.data.expectedDateOfReturn
            });

            const callNumbers = await ctx.request.body.callNums.map((el,index) => {
                ctx.db.callNumbers.create({
                    callNumber: el.callNumber,
                    identificationId: Item.identificationId,
                })
            });

            const wat = ctx.request.body.users.map( (el,index) => {
                return ctx.db.workAssignedTo.create({
                    personId: el,
                    itemId: Item.itemId
                })
            });

            const initialCount = await ctx.db.initialCounts.bulkCreate([
                {
                    itemId: Item.itemId,
                    countType: 'Volumes',
                    totalCount: ctx.request.body.data.volumeCount || 0,
                    description: ctx.request.body.data.volumeDescription

                },
                {
                    itemId: Item.itemId,
                    countType: 'Sheets',
                    totalCount: ctx.request.body.data.sheetCount || 0,
                    description: ctx.request.body.data.sheetDescription
                },
                {
                    itemId: Item.itemId,
                    countType: 'Photos',
                    totalCount: ctx.request.body.data.photoCount ||0,
                    description: ctx.request.body.data.photoDescription
                },
                {
                    itemId: Item.itemId,
                    countType: 'Other',
                    totalCount: ctx.request.body.data.otherCount || 0,
                    description: ctx.request.body.data.otherDescription
                },
                {
                    itemId: Item.itemId,
                    countType: 'Housing',
                    totalCount: ctx.request.body.data.housingCount || 0,
                    description: ctx.request.body.data.housingDescription
                },
                {
                    itemId: Item.itemId,
                    countType: 'Boxes',
                    totalCount: ctx.request.body.data.boxesCount || 0,
                    description: ctx.request.body.data.boxesDescription
                }
            ]);

            const Record = await ctx.db.Record.create({
                recordType: 'Item',
                identificationId: Ident.identificationId,
                purposeId: Ident.purposeId,
                homeLocationId: Ident.homeLocationId,
                chargeToId: Ident.chargeToId,
                title: ctx.request.body.data.recordTitle,
                departmentId: Ident.departmentId,
                groupId: Ident.groupId,
                projectId: Ident.projectId,
                comments: Ident.comments,
                inactive: Ident.inactive,
                editCounter: Ident.editCounter,
                nonDigitalImagesExist: Ident.nonDigitalImagesExist,
                isBeingEdited: Ident.isBeingEdited,
                editedBy: Ident.editedBy,
                curatorId: Ident.curatorId,
                approvingCuratorId: Ident.approvingCuratorId,
                collectionName: Item.collectionName,
                formatId: Item.formatId,
                coordinatorId: Item.coordinatorId,
                isNonCollectionMaterial: Item.isNonCollectionMaterial,
                expectedDateOfReturn: Item.expectedDateOfReturn,
                insuranceValue: Item.insuranceValue,
                fundMemo: Item.fundMemo,
                authorArtist: Item.authorArtist,
                dateOfObject: Item.dateOfObject,
                hollisNumber: Item.hollisNumber,
                storage: Item.storage,
                manuallyClosed: Item.manuallyClosed,
                manuallyClosedDate: Item.manuallyClosedDate
            });
            ctx.body = [Record, callNumbers, initialCount]
        }
        catch (err) {
            ctx.throw(500,err)
        }
    }
}
