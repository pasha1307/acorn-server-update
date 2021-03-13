module.exports = {
    async find(ctx) {
        try {
            ctx.body = await ctx.db.storage.findAll({
                where: {inactive: 0}
            })
        }
        catch (err) {
            ctx.throw(500, err)
        }
    }
}