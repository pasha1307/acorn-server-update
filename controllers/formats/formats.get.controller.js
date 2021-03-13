module.exports = {
    async find(ctx) {
        try {
           ctx.body = await ctx.db.formats.findAll({
               where: {inactive: 0},
               order: [['format']]
           })
        }
        catch (err) {
            ctx.throw(500, ctx.err)
        }
    }
}