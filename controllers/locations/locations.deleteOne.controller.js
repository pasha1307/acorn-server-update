module.exports = {
    async destroy(ctx) {
        try {
            const result = await ctx.db.locations.destroy({
                where: {locationId: ctx.params.id}
            });
            const msg = {
                title: 'locations',
                text:  `Location has been deleted`
            }
            ctx.body = {result, msg};
        }
        catch (err) {
            ctx.throw(500,err)
        }
    }
}
