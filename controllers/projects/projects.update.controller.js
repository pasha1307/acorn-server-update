module.exports = {
    async update(ctx) {
        try {
            const result = await ctx.db.projects.update({
                projectId: ctx.request.body.projectId,
                projectName: ctx.request.body.projectName,
                startDate: ctx.request.body.startDate,
                endDate: ctx.request.body.endDate,
                inactive: ctx.request.body.projectInactive,
                projectDescription: ctx.request.body.projectDescription,
            }, {
                where: {projectId: ctx.params.id}
            });
            const msg = {
                title: 'projects',
                text:  `project ${ctx.params.id} is updated to ${ctx.request.body.projectName}`
            }
            ctx.body = {result, msg};
        }
        catch (err) {
            ctx.throw(500,err)
        }
    }
}
