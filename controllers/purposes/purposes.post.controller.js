module.exports = {
    async create(ctx) {
        try {
            const result = await ctx.db.purposes.create({
                purpose: ctx.request.body.purposeName
            });
            const msg = {
                title: 'purposes',
                text:  `New ${ctx.request.body.purposeName} purpose has been created`
            }
            ctx.body = {result, msg}
        }
        catch (err) {
            ctx.throw(500,err)
        }
    }
}
