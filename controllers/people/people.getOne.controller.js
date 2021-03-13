module.exports = {
    async findOne(ctx) {
        try {
            ctx.body = await ctx.db.people.findOne({
                where: {personId: ctx.params.id},
                include: [{model: ctx.db.locations}]
            });
        }
        catch (err) {
            ctx.throw(500,err)
        }
    }
}
