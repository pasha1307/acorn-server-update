module.exports = {
    async create(ctx) {
        try {
            // const result = await ctx.db.files.create({
            //     pkid: '',
            //     path: '',
            //     description: '',
            //     fileType: 'Image',
            //     linkType: 'Item',
            //     dateEntered: new Date(),
            //     lastModified: new Date(),
            //     fileName: '',
            //     drsStatus: 'Complete',
            //     enteredById: '100',
            //     drsBatchName: ''
            // });
            // const msg = {
            //     title: 'worktypes',
            //     text:  `New ${ctx.request.body.workType} work type has been created`
            // }
            ctx.body = ctx.request.files;
        }
        catch (err) {
            ctx.throw(500,err)
        }
    }
}
