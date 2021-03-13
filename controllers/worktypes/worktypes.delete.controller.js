module.exports = {
    async destroy(ctx) {
        try {
            const result = await ctx.db.workTypes.destroy({
                where: {workTypeId: ctx.params.id}
            });
            const msg = {
                title: 'worktypes',
                text:  `Work type #${ctx.params.id} has been deleted`
            }
            ctx.body = {result, msg};
        }
        catch (err) {
            ctx.throw(500,err)
        }
    }
}
