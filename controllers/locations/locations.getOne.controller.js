module.exports = {
    async findOne(ctx) {
        try {
            ctx.body = await ctx.db.locations.findOne({
                where: {locationId: ctx.params.id},
                include: [{model: ctx.db.departments}]
            });
        }
        catch (e) {
            ctx.throw(500,e)
        }
    }
}
