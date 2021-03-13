module.exports = {
    async update(ctx) {
        try {
            const report = await ctx.db.itemReport.update({
                formatId: ctx.request.body.data.formatId,
                reportById: ctx.request.body.data.reportById,
                reportDate: ctx.request.body.data.reportDate,
                treatment: ctx.request.body.data.treatment,
                summary: ctx.request.body.data.summary,
                height: ctx.request.body.data.height,
                width: ctx.request.body.data.width,
                thickness: ctx.request.body.data.thickness,
                dimensionUnit: ctx.request.body.data.dimensionUnit,
                workLocationId: ctx.request.body.data.workLocationId,
                examOnly: ctx.request.body.data.examOnly,
                customHousingOnly: ctx.request.body.data.customHousingOnly,
                adminOnly: ctx.request.body.data.adminOnly,
                preservationRecommendations: ctx.request.body.data.preservationRecommendations,
                additionalMaterialsOnFile: ctx.request.body.data.additionalMaterialsOnFile
            }, {
                where: {
                    reportId: ctx.params.id
                }
            });

            // workDoneBy
            const delWorkDone = await ctx.db.workDoneBy.destroy({
                where: {
                    identificationId: ctx.request.body.identificationId
                }
            });
            const doneBy = await ctx.request.body.doneBy.map((el,index) => {
                ctx.db.workDoneBy.create({
                    personId: el.personId,
                    identificationId: ctx.request.body.identificationId,
                    completedHours: el.completedHours,
                    dateCompleted: el.dateCompleted
                })
            });

            // reportCounts
            const volUpdate = await ctx.db.reportCounts.update({
                reportId: ctx.params.id,
                countType: 'Volumes',
                totalCount: ctx.request.body.data.volumeCount,
                description: ctx.request.body.data.volumeDescription
            },{
                where: {
                    reportId: ctx.params.id,
                    countType: 'Volumes'
                }
            });
            const shUpdate = await ctx.db.reportCounts.update({
                reportId: ctx.params.id,
                countType: 'Sheets',
                totalCount: ctx.request.body.data.sheetCount,
                description: ctx.request.body.data.sheetDescription
            },{
                where: {
                    reportId: ctx.params.id,
                    countType: 'Sheets'
                }
            })
            const photoUpdate = await ctx.db.reportCounts.update({
                reportId: ctx.params.id,
                countType: 'Photos',
                totalCount: ctx.request.body.data.photoCount,
                description: ctx.request.body.data.photoDescription
            },{
                where: {
                    reportId: ctx.params.id,
                    countType: 'Photos'
                }
            })
            const otherUpdate = await ctx.db.reportCounts.update({
                reportId: ctx.params.id,
                countType: 'Other',
                totalCount: ctx.request.body.data.otherCount,
                description: ctx.request.body.data.otherDescription
            },{
                where: {
                    reportId: ctx.params.id,
                    countType: 'Other'
                }
            })
            const housingUpdate = await ctx.db.reportCounts.update({
                reportId: ctx.params.id,
                countType: 'Housing',
                totalCount: ctx.request.body.data.housingCount,
                description: ctx.request.body.data.housingDescription
            },{
                where: {
                    reportId: ctx.params.id,
                    countType: 'Housing'
                }
            })
            const boxUpdate = await ctx.db.reportCounts.update({
                reportId: ctx.params.id,
                countType: 'Boxes',
                totalCount: ctx.request.body.data.boxesCount,
                description: ctx.request.body.data.boxesDescription
            },{
                where: {
                    reportId: ctx.params.id,
                    countType: 'Boxes'
                }
            })

            // const msg = `report ${ctx.params.id} has been updated`;
            ctx.body = [report];

        }
        catch (err) {
            ctx.throw(500, err);
        }
    }
};
