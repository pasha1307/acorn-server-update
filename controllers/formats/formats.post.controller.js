module.exports = {
    async create(ctx) {
        try {
            const result = await ctx.db.formats.create({
                format: ctx.request.body.formatName,
                rank: ctx.request.body.formatRank
            });
            const msg = {
                title: 'formats',
                text:  `New ${ctx.request.body.formatName} format has been created`
            }
            ctx.body = {result, msg}
        }
        catch (err) {
            ctx.throw(500,err)
        }
    }
}
