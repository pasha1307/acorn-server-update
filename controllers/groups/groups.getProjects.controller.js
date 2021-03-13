module.exports = {
    async find(ctx) {
        try {
           ctx.body = await ctx.db.groups.findAll({
               attributes: ['groupId', 'groupName'],
               include: [
                   {model: ctx.db.projects}
               ]
           })
        }
        catch (err) {
            ctx.throw(500, ctx.err)
        }
    }
}

