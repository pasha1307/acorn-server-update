module.exports = {
    async destroy(ctx) {
        try {
            const result = await ctx.db.formats.destroy({
                where: {formatId: ctx.params.id}
            });
            const msg = {
                title: 'formats',
                text:  `Format ${ctx.params.id} has been deleted`
            }
            ctx.body = {result, msg};
        }
        catch (err) {
            ctx.throw(500,err)
        }
    }
}
