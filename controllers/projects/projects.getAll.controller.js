module.exports = {
    async find(ctx) {
        try {
            ctx.body = await ctx.db.projects.findAll({
                where: {
                    ProjectName: {
                        $ne: ''
                    }
                },
                // attributes: ['projectId', 'projectName', 'projectDescription'],
                order: [['projectName', 'ASC']]
            })
        }
        catch (err) {
            ctx.throw(500, ctx.err)
        }
    }
}
