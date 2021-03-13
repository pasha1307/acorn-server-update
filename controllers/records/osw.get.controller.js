module.exports = {
    async find(ctx) {
        try {
            ctx.body = await ctx.db.osw.findAll({
                order:[['oswid', 'DESC']]
            });
        }
        catch (err) {
            ctx.throw(500, err)
        }
    }
}
