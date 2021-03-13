module.exports = {
    async destroy(ctx) {
        try {
            const result = await ctx.db.Record.destroy({
                where: {recordId: ctx.params.id}
            });
            const msg = {
                title: 'Record',
                text:  `Record ${ctx.params.id} has been deleted`
            }
            ctx.body = {result, msg};
        }
        catch (err) {
            ctx.throw(500,err)
        }
    }
}
