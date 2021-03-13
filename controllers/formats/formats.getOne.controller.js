module.exports = {
    async findOne(ctx) {
        try {
            ctx.body = await ctx.db.formats.findOne({
                where: {formatId: ctx.params.id},
            });
        }
        catch (e) {
            ctx.throw(500,e)
        }
    }
}
