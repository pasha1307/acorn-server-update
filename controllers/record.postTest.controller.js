module.exports = {
    async create(ctx) {
        try {
            const Ident = await ctx.db.itemIdentification.create({
                purposeId: ctx.request.body.purposeId,
                homeLocationId: ctx.request.body.homeLocationId,
                departmentId: ctx.request.body.departmentId,
                title: ctx.request.body.recordTitle,
                groupId: ctx.request.body.groupId,
                projectId: ctx.request.body.projectId,
                comments: ctx.request.body.comments,
                inactive: ctx.request.body.recordInactive,
                isBeingEdited: ctx.request.body.isEdited,
                editedById: ctx.request.body.recordInactive,
                curatorId: ctx.request.body.curatorId,
                manuallyClosed: 0,
                chargeToId: ctx.request.body.chargeToId
            });
            const OSW = await ctx.db.osw({
                identificationId: Ident.identificationId,
                proposedHours: ctx.request.body.proposedHours,
                workStartDate: ctx.request.body.workStartDate,
                workEndDate: ctx.request.body.workEndDate
            })
            const Item = await ctx.db.items.create({
                itemId: Ident.identificationId,
                formatId: ctx.request.body.formatId,
                identificationId: Ident.identificationId,
                coordinatorId: ctx.request.body.coordinatorId,
                fundMemo: ctx.request.body.fundMemo,
            });
            const callNumbers = await ctx.db.callNumbers.create({
                identificationId: Ident.identificationId,
                callNumber: ctx.request.body.callNumber
            });
            const initialCount = await ctx.db.initialCounts.bulkCreate([
                {
                    itemId: Ident.identificationId,
                    countType: 'Volumes',
                    totalCount: ctx.request.body.volumeCount,
                    description: ctx.request.body.volumeDescription

                },
                {
                    itemId: Ident.identificationId,
                    countType: 'Sheets',
                    totalCount: ctx.request.body.sheetCount,
                    description: ctx.request.body.sheetDescription
                },
                {
                    itemId: Ident.identificationId,
                    countType: 'Photos',
                    totalCount: ctx.request.body.photoCount,
                    description: ctx.request.body.photoDescription
                },
                {
                    itemId: Ident.identificationId,
                    countType: 'Other',
                    totalCount: ctx.request.body.otherCount,
                    description: ctx.request.body.otherDescription
                },
                {
                    itemId: Ident.identificationId,
                    countType: 'Boxes',
                    totalCount: ctx.request.body.boxesCount,
                    description: ctx.request.body.boxesDescription
                },
            ]);
            ctx.body = await ctx.db.Record.create({
                recordTitle: ctx.request.body.recordTitle,
                recordType: ctx.request.body.recordType,
                identificationId: Ident.identificationId,
                homeLocationId: ctx.request.body.homeLocationId,
                departmentId: homeLocationId,
                curatorId: ctx.request.body.curatorId,
                projectId: ctx.request.body.projectId,
                groupId: ctx.request.body.groupId,
                purposeId: ctx.request.body.purposeId,
                chargeToId: ctx.request.body.chargeToId,
                formatId: ctx.request.body.formatId,
                comments: ctx.request.body.comments,
                fundMemo: ctx.request.body.fundMemo,
                inactive: ctx.request.body.recordInactive,
                isBeingEdited: ctx.request.body.isEdited
            });

            // ctx.body = recordOSW;
        }
        catch (err) {
            ctx.throw(500,err)
        }
    }
}
