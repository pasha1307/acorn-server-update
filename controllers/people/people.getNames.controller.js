module.exports = {
    async find(ctx) {
        try {
         ctx.body = await ctx.db.people.findAll({
             attributes: ['PersonID', 'DisplayName', 'AccessLevel']
         })
        }
        catch (err) {
            ctx.throw(500, err)
        }
    }
}
