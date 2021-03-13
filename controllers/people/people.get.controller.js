module.exports = {
    async find(ctx) {
        try {
            ctx.body = await ctx.db.people.findAll({
                order: [['sortName', 'ASC']],
                include: [
                    {
                        model: ctx.db.locations,
                        attributes: ['location']
                    }
                    ]
            })
        }
        catch (err) {
            ctx.throw(500, err)
        }
    }
}
