module.exports = {
    async update(ctx) {
        try {
            const result = await ctx.db.groups.update({
                inactive: ctx.request.body.inactive,
            }, {
                where: {groupId: ctx.params.id}
            });
            const msg = {
                title: 'groups',
                text:  `Group ${ctx.params.id} Inactive Status is ${ctx.request.body.inactive}`
            }
            ctx.body = {result, msg}
        }
        catch (err) {
            ctx.throw(500,err)
        }
    }
}
