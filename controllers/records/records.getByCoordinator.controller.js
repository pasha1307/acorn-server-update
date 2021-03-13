module.exports = {
    async find(ctx) {
        try {
           ctx.body = await ctx.db.Record.findAndCount({
               where: {
                   coordinatorId: ctx.params.id
               }
           })
        }
        catch (err) {
            ctx.throw(500, err)
        }
    }
}
