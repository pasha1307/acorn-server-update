// Change compare passwords to Bcrypt Hash option
const UtilService = require('../../services/util.service');
const JwtService = require('../../services/jwt.service');
module.exports = {
    async login(ctx) {
        try {
            const user = await ctx.db.people.findOne({
                where: {
                    emailAddress: ctx.request.body.emailAddress
                }
            });
            // const xPass = await UtilService.hashPassword(ctx.request.body.userPassword);
            const match = await UtilService.matchSimple(ctx.request.body.userPassword, user.userPassword);

            if (match) {
               const token = JwtService.issue({
                   user: user.personId
               }, '1h')
                ctx.body = {
                    token: 'Bearer'+" "+ token,
                    expiresIn: 3600,
                    accessLevel: user.accessLevel,
                    userId: user.personId
               };
            } else {
                ctx.throw(500, 'Invalid password')
            }
        }
        catch (err) {
            ctx.throw(500, err)
        }
    }
};
