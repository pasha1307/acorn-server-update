module.exports = {
    async update(ctx) {
        try {
            const result = await ctx.db.workTypes.update({
                workType: ctx.request.body.workType,
                inactive: ctx.request.body.workTypeInactive,
            }, {
                where: {workTypeId: ctx.params.id}
            });
            const msg = {
                title: 'worktypes',
                text:  `Work type #${ctx.params.id} is updated - ${ctx.request.body.workType}`
            }
            ctx.body = {result, msg};
        }
        catch (err) {
            ctx.throw(500,err)
        }
    }
}
