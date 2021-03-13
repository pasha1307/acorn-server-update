module.exports = {
    async create(ctx) {
        try {
            const Ident = await ctx.db.itemIdentification.create({
                purposeId: ctx.request.body.data.purposeId,
                homeLocationId: ctx.request.body.data.homeLocationId,
                departmentId: ctx.request.body.data.departmentId,
                title: ctx.request.body.data.title,
                groupId: ctx.request.body.data.groupId,
                projectId: ctx.request.body.data.projectId,
                comments: ctx.request.body.data.comments,
                editCounter: ctx.request.body.data.editCounter,
                curatorId: ctx.request.body.data.curatorId,
                approvingCuratorId: ctx.request.body.data.curatorId,
                chargeToId: ctx.request.body.data.chargeToId
            });
            const OSW = await ctx.db.osw.create({
                identificationId: Ident.identificationId,
                proposedHours: ctx.request.body.data.proposedHours,
                workStartDate: ctx.request.body.data.workStartDate,
                workEndDate: ctx.request.body.data.workEndDate,
                formatId: ctx.request.body.data.formatId,
                workLocationId: ctx.request.body.data.workLocationId
            });
            const Item = await ctx.db.items.create({
                formatId: ctx.request.body.data.formatId,
                identificationId: Ident.identificationId,
                coordinatorId: ctx.request.body.data.coordinatorId,
                fundMemo: ctx.request.body.data.fundMemo,
            });
            const callNumbers = await ctx.request.body.callNums.map((el,index) => {
                ctx.db.callNumbers.create({
                    callNumber: el.callNumber,
                    identificationId: Item.identificationId,
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
                    totalCount: ctx.request.body.data.photoCount || 0,
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
                },
            ]);
            const oswWorks = await ctx.db.oswWorkTypes.create({
                oswid: OSW.oswid,
                workTypeId: ctx.request.body.data.workTypeId
            });
          const oswRecord = await ctx.db.Record.create({
                identificationId: Ident.identificationId,
                title: ctx.request.body.data.title,
                recordType: 'OSW',
                homeLocationId: Ident.homeLocationId,
                departmentId: ctx.request.body.data.departmentId,
                curatorId: ctx.request.body.data.curatorId,
                approvingCuratorId: ctx.request.body.data.curatorId,
                coordinatorId: ctx.request.body.data.coordinatorId,
                projectId: ctx.request.body.data.projectId,
                groupId: ctx.request.body.data.groupId,
                purposeId: ctx.request.body.data.purposeId,
                chargeToId: ctx.request.body.data.chargeToId,
                formatId: OSW.formatId,
                comments: ctx.request.body.data.comments,
                fundMemo: ctx.request.body.data.fundMemo,
            });
            const workDone = await ctx.db.workDone.create({
                oswid: OSW.oswid,
                personId: ctx.request.body.data.coordinatorId,
                completedHours: 0,
                dateCompleted: ctx.request.body.data.workEndDate
            });
            ctx.body = [oswRecord]
        }
        catch (err) {
            ctx.throw(500,err)
        }
    }
}
