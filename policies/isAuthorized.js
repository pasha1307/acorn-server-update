const JwtService = require('../services/jwt.service');

module.exports = async (ctx, next) => {
    try {
       const token = ctx.req.headers.authorization.split(" ")[1];
       JwtService.verify(token);
       await next()
    }
    catch (err) {
        ctx.throw(401, err)
    }
}
// module.exports = async (ctx, next) => {
//     let token = ''
//     if (ctx.req.headers && ctx.req.headers.authorization) {
//         token = ctx.req.headers.authorization;
//     } else {
//         ctx.throw(401, 'Authorization header is missing')
//     }
//     const decodedToken = JwtService.verify(token);
//
//     const user = await ctx.db.people.findOne({
//         where: {
//             personId: decodedToken.user
//         }
//     });
//     if (user) {
//         ctx.state.user = user;
//         await next()
//
//     } else {
//         // ctx.body = {decodedToken};
//         ctx.throw(401, 'unauthorized');
//     }
//
// }
