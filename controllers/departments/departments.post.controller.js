module.exports = {
    async create(ctx) {
        try {
            const result = await ctx.db.departments.create({
                locationId: ctx.request.body.locationId,
                departmentName: ctx.request.body.departmentName,
                shortName:ctx.request.body.shortName,
                acronym: ctx.request.body.acronym
            });
            const msg = {
                title: 'departments',
                text:  `New department ${ctx.request.body.departmentName} has been created`
            }
            ctx.body = {result, msg}
        }
        catch (err) {
            ctx.throw(500,err)
        }
    }
}
