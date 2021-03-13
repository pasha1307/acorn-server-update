module.exports = {
    async find(ctx) {
        try {
            ctx.body = await ctx.db.locations.findAll({
                order:[['location', 'ASC']],
                include: [{model: ctx.db.departments}]
                // where: {
                //     isWorkLocation: 1
                // }
                // attributes: ['locationId', 'location', 'tub'],
            })
        }
        catch (e) {
            ctx.throw(500, e);
        }
    }
};

