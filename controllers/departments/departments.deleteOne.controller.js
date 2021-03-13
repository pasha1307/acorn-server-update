module.exports = {
    async destroy(ctx) {
        try {
            const result = await ctx.db.departments.destroy({
                where: {departmentId: ctx.params.id}
            });
            const msg = {
                title: 'departments',
                text:  `Deaprtment ${departmentId} has been deleted`
            }
            ctx.body = {result, msg};
        }
        catch (err) {
            ctx.throw(500,err)
        }
    }
}
