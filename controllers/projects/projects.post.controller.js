module.exports = {
    async create(ctx) {
        try {
            const result = await ctx.db.projects.create({
                projectName: ctx.request.body.projectName,
                startDate: ctx.request.body.startDate,
                endDate: ctx.request.body.endDate,
                inactive: ctx.request.body.projectInactive,
                projectDescription: ctx.request.body.projectDescription
            });
            const msg = {
                title: 'projects',
                text:  `New ${ctx.request.body.projectName} project has been created`
            }
            ctx.body = {result, msg}
        }
        catch (err) {
            ctx.throw(500,err)
        }
    }
}
