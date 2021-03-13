module.exports = {
    async find(ctx) {
        try {
            ctx.body = await ctx.db.autotext.findAll({
                where: {
                    autotext: {
                        $ne: null
                    }
                }
            });
        }
        catch (err) {
            ctx.throw(500, err);
        }
    }
};
