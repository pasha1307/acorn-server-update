module.exports = {
    async findOne(ctx) {
        try {
            ctx.body = await ctx.db.departments.findOne({
                where: {departmentId: ctx.params.id},
                include: [{model: ctx.db.locations}]
            });
        }
        catch (e) {
            ctx.throw(500,e)
        }
    }
}
