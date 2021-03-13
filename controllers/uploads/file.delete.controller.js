const fs = require('fs');
const baseUrl = 'http://localhost:5001/';
module.exports = {
    async destroy(ctx) {
        try {
            const currentFile = await ctx.db.itemFiles.findOne({
                where: {fileId: ctx.params.fileId}
            });
            const url = currentFile.path.substring(baseUrl.length);
            const filePath = 'public/' + url;
            const res = await fs.unlink(filePath, () => {
                console.log('Deleted')
            });
            // const resultFile = await ctx.db.files.destroy({
            //     where: {fileId: ctx.params.fileId}
            // });
            const resultItemFiles = await ctx.db.itemFiles.destroy({
                where: {fileId: ctx.params.fileId}
            });
            const msg = {
                title: 'Files',
                text:  `file data ${ctx.params.fileId} has been deleted`
            };
            ctx.body = {msg};
        }
        catch (err) {
            ctx.throw(500,err)
        }
    }
}
