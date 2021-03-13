module.exports = {
    async find(ctx) {
        try {
            ctx.body = await ctx.db.items.getItems();
        }
        catch (err) {
            ctx.throw(500, ctx.err)
        }
    }
}
