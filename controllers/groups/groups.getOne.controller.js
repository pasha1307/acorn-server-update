module.exports = {
    async findOne(ctx) {
        try {
            ctx.body = await ctx.db.groups.findOne({
                where: {groupId: ctx.params.id},
            });
        }
        catch (e) {
            ctx.throw(500,e)
        }
    }
}
