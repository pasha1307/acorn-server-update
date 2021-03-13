module.exports = {
    async destroy(ctx) {
        try {
            const result = await ctx.db.projects.destroy({
                where: {projectId: ctx.params.id}
            });
            const msg = {
                title: 'projects',
                text:  `project ${ctx.params.id} has been deleted`
            }
            ctx.body = {result, msg};
        }
        catch (err) {
            ctx.throw(500,err)
        }
    }
}
