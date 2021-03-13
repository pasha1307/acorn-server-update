module.exports = {
 async find(ctx) {
     try {
         ctx.body = await ctx.db.purposes.findAll({
             order: [['purpose', 'ASC']]
         })
     }
     catch (err) {
         ctx.throw(500, ctx.err)
     }
 }
}
