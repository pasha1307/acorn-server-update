module.exports = {
    async find(ctx) {
        try {
            ctx.body = await ctx.db.workTypes.findAll({
                order: [['workType', 'ASC']]
            })
        }
        catch
            (err)
            {
                ctx.throw(500, ctx.err);
            }
        }
    }
