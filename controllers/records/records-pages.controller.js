module.exports = {
    async find(ctx) {
        try {
            const limit = 20;
            const page = ctx.params.page || null;
            const records = await ctx.db.Record.findAndCountAll();
            const pages = await Math.ceil(records.count / limit);
            const result = await ctx.db.Record.findAll({
                limit: limit,
                offset: limit * (page -1)

            },
                {where: {page: ctx.params.page}});

            ctx.body = [{totalPages: pages}, result];
        }
        catch (e) {
            ctx.throw(500,e);
        }
    }
}
