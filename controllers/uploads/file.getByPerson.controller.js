module.exports = {
    async find(ctx) {
        try {
            ctx.body = await ctx.db.files.findAll({
                where : {
                    enteredById: ctx.params.personId
                },
                limit: 20,
                order: [['fileId', 'DESC']]
            });
        }
        catch (err) {
            ctx.throw(500, ctx.err);
        }
    }
}
