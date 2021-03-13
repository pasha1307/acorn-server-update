module.exports = {
    async destroy(ctx) {
        try {
            const result = await ctx.db.importances.destroy({
                where: {importanceId: ctx.params.id}
            });
            const msg = {
                title: 'importance',
                text:  `Importance ${ctx.params.id} has been deleted`
            }
            ctx.body = {result, msg};
        }
        catch (err) {
            ctx.throw(500,err)
        }
    }
}
