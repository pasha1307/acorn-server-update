module.exports = {
    async create(ctx) {
        try {
            const report = await ctx.db.itemReport.create({
                formatId: ctx.request.body.data.formatId,
                identificationId: ctx.request.body.itemIdent,
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
            });
            const reportCount = await ctx.db.reportCounts.bulkCreate([
                {
                    reportId: report.reportId,
                    countType: 'Volumes',
                    totalCount: ctx.request.body.data.volumeCount || 0,
                    description: ctx.request.body.data.volumeDescription
                },
                {
                    reportId: report.reportId,
                    countType: 'Sheets',
                    totalCount: ctx.request.body.data.sheetCount || 0,
                    description: ctx.request.body.data.sheetDescription
                },
                {
                    reportId: report.reportId,
                    countType: 'Photos',
                    totalCount: ctx.request.body.data.photoCount || 0,
                    description: ctx.request.body.data.photoDescription
                },
                {
                    reportId: report.reportId,
                    countType: 'Other',
                    totalCount: ctx.request.body.data.otherCount || 0,
                    description: ctx.request.body.data.otherDescription
                },
                {
                    reportId: report.reportId,
                    countType: 'Housing',
                    totalCount: ctx.request.body.data.housingCount || 0,
                    description: ctx.request.body.data.housingDescription
                },
                {
                    reportId: report.reportId,
                    countType: 'Boxes',
                    totalCount: ctx.request.body.data.boxesCount || 0,
                    description: ctx.request.body.data.boxesDescription
                },
            ]);

            const workDoneBy = await ctx.request.body.users.map(el => {
                ctx.db.workDoneBy.create({
                    personId: el.personId,
                    identificationId: ctx.request.body.itemIdent,
                    dateCompleted: el.dateCompleted,
                    completedHours: el.completedHours
                })
            });
            const importance = await ctx.db.itemImportances.create({
                reportId: report.reportId,
                importanceId: ctx.request.body.data.importanceId
            });

            ctx.body = [report, importance, reportCount];
        } catch (err) {
            ctx.throw(500, err);
        }
    }
};

