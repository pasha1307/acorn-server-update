module.exports = {
    async destroy(ctx) {
        try {
            const report = await ctx.db.itemReport.destroy({
                where: {
                    reportId: ctx.params.id,
                }
            });
            const importance = await ctx.db.itemImportances.destroy({
                where: {
                    reportId: ctx.params.id
                }
            });
            const reportCounts = await ctx.db.reportCounts.destroy({
                where: {
                    reportId: ctx.params.id
                }
            });

            const msg = {
                title: 'Report',
                text:  `Report ${ctx.params.id} has been deleted`
            };
            ctx.body = {report, msg};
        }
        catch (err) {
            ctx.throw(500, ctx.err)
        }
    }
};
