module.exports = {
    async create(ctx) {
        try {
            const File = await ctx.request.body.images.map(el => {
                ctx.db.files.create({
                    pkid: ctx.request.body.identificationId,
                    path: el.path,
                    description: ctx.request.body.data.description,
                    fileType: 'Image',
                    linkType: 'Item',
                    dateEntered: new Date(),
                    lastModified: new Date(),
                    fileName: el.name,
                    drsStatus: 'Complete',
                    enteredById: ctx.request.body.data.coordinatorId,
                    drsBatchName: ''
                })
            });
            const itemFiles = await ctx.request.body.images.map(el => {
                ctx.db.itemFiles.create({
                    identificationId: ctx.request.body.identificationId,
                    pkid: ctx.request.body.identificationId,
                    path: el.path,
                    description: ctx.request.body.data.description,
                    fileType: 'Image',
                    linkType: 'Item',
                    dateEntered: new Date(),
                    lastModified: new Date(),
                    fileName: el.name,
                    drsStatus: 'Complete',
                    enteredById: ctx.request.body.data.coordinatorId,
                    drsBatchName: ''
                })
            });
            const msg = {
                title: 'Files',
                text:  `File Data has been saved`
            };
            ctx.body = {msg};
        }
        catch (err) {
            ctx.throw(500,err)
        }
    }
};

