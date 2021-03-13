module.exports = {
    async find(ctx) {
        try {
           ctx.body = await ctx.db.people.findAll({
               where: {
                   AccessLevel: {
                       $ne: 'None',
                       $ne: 'Repository Admin',
                       $ne: 'Repository'
                   }
               }
           })
        }
        catch (err) {
            ctx.throw(500, ctx.err)
        }
    }
}