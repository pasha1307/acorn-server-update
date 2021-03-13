module.exports = {
    async create(ctx) {
        try {
            const result = await ctx.db.workTypes.create({
                workType: ctx.request.body.workType
            });
            const msg = {
                title: 'worktypes',
                text:  `New ${ctx.request.body.workType} work type has been created`
            }
            ctx.body = {result, msg}
        }
        catch (err) {
            ctx.throw(500,err)
        }
    }
}
