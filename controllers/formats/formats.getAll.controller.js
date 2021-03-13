module.exports = {
    async find(ctx) {
        try {
            ctx.body = await ctx.db.formats.findAll({
                order: [['format']]
            })
        }
        catch (err) {
            ctx.throw(500, ctx.err)
        }
    }
}
