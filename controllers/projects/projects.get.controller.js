module.exports = {
    async find(ctx) {
        try {
           ctx.body = await ctx.db.projects.findAll({
            where: {
                ProjectName: {
                $ne: ''
                },
                inactive: 0
                },
               attributes: ['projectId', 'projectName', 'projectDescription'],
               order: [['projectName', 'ASC']],
               include: [
                   {model: ctx.db.groups}
               ]
           })
        }
        catch (err) {
            ctx.throw(500, ctx.err)
        }
    }
}
