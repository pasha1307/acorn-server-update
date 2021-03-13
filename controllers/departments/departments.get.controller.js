module.exports = {
    async find(ctx) {
        try {
            ctx.body = await ctx.db.departments.findAll({
                order:[['departmentName', 'ASC']],
                include: [{model: ctx.db.locations}]
            })
        }
        catch (e) {
            ctx.throw(500, e);
        }
    }
}

