module.exports = {
    async destroy(ctx) {
        try {
            const result = await ctx.db.purposes.destroy({
                where: {purposeId: ctx.params.id}
            });
            const msg = {
                title: 'purposes',
                text:  `purpose ${ctx.params.id} has been deleted`
            }
            ctx.body = {result, msg};
        }
        catch (err) {
            ctx.throw(500,err)
        }
    }
}
