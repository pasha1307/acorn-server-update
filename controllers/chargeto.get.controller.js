module.exports = {
    async find(ctx) {
        try {
            ctx.body = await ctx.db.chargeto.findAll({
                where : {
                    ChargeToName: {
                        $ne: ''
                    }
                },
                attributes: ['ChargeToID','ChargeToName', 'ChargeToType'],
                order: [['ChargeToName']]
            });
        }
        catch (err) {
            ctx.throw(500, ctx.err);
        }
    }
}