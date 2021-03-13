module.exports = {
    async find(ctx) {
        try {
         ctx.body = await ctx.db.roles.findAll({
             attributes: ['personId', 'roleType'],
             include: [
                 { model: ctx.db.people, attributes: ['displayName'] }
             ]
         })
        }
        catch (err) {
            ctx.throw(500, ctx.err)
        }
    }
}