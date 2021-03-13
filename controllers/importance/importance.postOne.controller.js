module.exports = {
    async create(ctx) {
        try {
            const result = await ctx.db.importances.create({
                importance: ctx.request.body.importanceName
            });
            const msg = {
                title: 'importance',
                text:  `New ${ctx.request.body.importanceName} format has been created`
            }
            ctx.body = {result, msg}
        }
        catch (err) {
            ctx.throw(500,err)
        }
    }
}
