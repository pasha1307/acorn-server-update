module.exports = {
    async find(ctx) {
        try {
            ctx.body = await ctx.db.workTypes.findAll({
                where: {
                    inactive: {
                        $ne: 1
                    }
                }
            })
        }
        catch
            (err)
        {
            ctx.throw(500, ctx.err);
        }
    }
}
