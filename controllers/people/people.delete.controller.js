module.exports = {
    async destroy(ctx) {
        try {
            const result = await ctx.db.people.destroy({
                where: {personId: ctx.params.id}
            });
            const msg = {
                title: 'people',
                text:  `User ${ctx.params.id} has been deleted`
            }
            ctx.body = {result, msg};
        }
        catch (err) {
            ctx.throw(500,err)
        }
    }
}
