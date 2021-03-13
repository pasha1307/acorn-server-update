module.exports = {
    async find(ctx) {
        try {
            ctx.body = await ctx.db.importances.findAll({
                order: [['importance']]
            })
        }
        catch (err) {
            ctx.throw(500, err)
        }
    }
}
