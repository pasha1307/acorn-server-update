module.exports = {
    async update(ctx) {
        try {
           const result = await ctx.db.locations.update({
               locationId: ctx.request.body.locationId,
                location: ctx.request.body.locationName,
                inactive: ctx.request.body.locationStatus,
                isRepository: ctx.request.body.locationRepoStatus
            }, {
                where: {locationId: ctx.params.id}
            });
            const msg = {
                title: 'locations',
                text:  `Location ${ctx.params.id} is updated. New Location: ${ctx.request.body.locationName}`
            }
         ctx.body = {result, msg};
        }
        catch (err) {
            ctx.throw(500,err)
        }
    }
}
