module.exports = {
    async update(ctx) {
        try {
            const result = await ctx.db.importances.update({
                importance: ctx.request.body.importanceName,
                inactive: ctx.request.body.importanceInactive,
            }, {
                where: {importanceId: ctx.params.id}
            });
            const msg = {
                title: 'importance',
                text:  `Importance ${ctx.params.id} is updated - ${ctx.request.body.importanceName}`
            }
            ctx.body = {result, msg};
        }
        catch (err) {
            ctx.throw(500,err)
        }
    }
}
