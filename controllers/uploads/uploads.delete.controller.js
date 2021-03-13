const fs = require('fs');
module.exports = {
    async destroy(ctx) {
        try {
            const filePath = 'public/' + ctx.params.id;
            const res = await fs.unlink(filePath, () => {
                 console.log('Deleted')
            });
            ctx.body = res;
        }
        catch (err) {
            ctx.throw(500,err)
        }
    }
};


