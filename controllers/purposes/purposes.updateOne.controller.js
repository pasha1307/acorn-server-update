module.exports = {
    async update(ctx) {
        try {
            const result = await ctx.db.purposes.update({
                purpose: ctx.request.body.purposeName,
                inactive: ctx.request.body.purposeInactive,
            }, {
                where: {purposeId: ctx.params.id}
            });
            const msg = {
                title: 'purposes',
                text:  `purpose ${ctx.params.id} is updated - ${ctx.request.body.purposeName}`
            }
            ctx.body = {result, msg};
        }
        catch (err) {
            ctx.throw(500,err)
        }
    }
}
