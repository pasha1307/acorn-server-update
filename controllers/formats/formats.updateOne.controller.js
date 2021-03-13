module.exports = {
    async update(ctx) {
        try {
            const result = await ctx.db.formats.update({
                format: ctx.request.body.formatName,
                inactive: ctx.request.body.formatInactive,
                rank: ctx.request.body.formatRank
            }, {
                where: {formatId: ctx.params.id}
            });
            const msg = {
                title: 'formats',
                text:  `Format ${ctx.params.id} is updated - ${ctx.request.body.formatName}`
            }
            ctx.body = {result, msg};
        }
        catch (err) {
            ctx.throw(500,err)
        }
    }
}
