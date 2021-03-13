module.exports = {
    async find(ctx) {
        try {
            ctx.body = await ctx.db.workDone.findAll({})
        }
        catch
            (err)
        {
            ctx.throw(500, ctx.err);
        }
    }
}

