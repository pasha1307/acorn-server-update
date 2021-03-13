module.exports = {
    async create(ctx) {
        try {
        const result = await ctx.db.locations.create({
                location: ctx.request.body.locationName,
                tub: ctx.request.body.tub,
                shortName:ctx.request.body.shortName,
                acronym: ctx.request.body.acronym,
                isRepository: ctx.request.body.locationRepoStatus
            });
            const msg = {
                title: 'locations',
                text:  `New location ${ctx.request.body.locationName} has been created`
            }
           ctx.body = {result, msg}
        }
        catch (err) {
            ctx.throw(500,err)
        }
    }
}
