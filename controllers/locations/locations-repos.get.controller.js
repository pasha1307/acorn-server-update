module.exports = {
    async find(ctx) {
        try {
            ctx.body = await ctx.db.locations.findAll({
                order:[['location', 'ASC']],
                where: {isRepository: 1},
                attributes: ['locationId', 'location', 'tub'],
                include: [{model: ctx.db.departments}]
            })
        }
        catch (e) {
            ctx.throw(500, e);
        }
    }
}
