module.exports = {
    async update(ctx) {
        try {
            const result = await ctx.db.departments.update({
                departmentId: ctx.request.body.departmentId,
                departmentName: ctx.request.body.departmentName,
                inactive: ctx.request.body.locationStatus
            }, {
                where: {departmentId: ctx.params.id}
            });
            const msg = {
                title: 'departments',
                text: `Department ${ctx.params.id} has been updated; new Name is ${ctx.request.body.departmentName}`
            }
            ctx.body = {result, msg};
        }
        catch (err) {
            ctx.throw(500,err)
        }
    }
}
