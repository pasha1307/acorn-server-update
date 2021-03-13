// NOT DONE TEST MODE
const UtilService = require('../../services/util.service');
module.exports = {
    async signup(ctx) {
        try {
        const xPass = await UtilService.hashPassword(ctx.request.body.userPassword);
        const comparePass = await UtilService.comparedPasswords();
          // const user = {
          //     locationId: ctx.request.body.locationId,
          //     firstName: ctx.request.body.firstName,
          //     middleName: ctx.request.body.middleName,
          //     lastName: ctx.request.body.lastName,
          //     username: ctx.request.body.username,
          //     userPassword: encriptedPass,
          //     inactive: 0,
          //     accessLevel: ctx.request.body.accessLevel,
          //     displayName: ctx.request.body.firstName + ' ' + ctx.request.body.lastName,
          //     sortName: ctx.request.body.lastName + ', ' + ctx.request.body.firstName,
          //     initials: (ctx.request.body.firstName.charAt(0) + ctx.request.body.lastName.charAt(0)).toUpperCase(),
          //     emailAddress: ctx.request.body.emailAddress,
          //     receiveAllDrsEmail: ''
          // }

          const newUser = await ctx.db.people.create({
              locationId: ctx.request.body.locationId,
              firstName: ctx.request.body.firstName,
              middleName: ctx.request.body.middleName,
              lastName: ctx.request.body.lastName,
              username: ctx.request.body.username,
              userPassword: xPass,
              inactive: 0,
              accessLevel: ctx.request.body.accessLevel,
              displayName: ctx.request.body.firstName + ' ' + ctx.request.body.lastName,
              sortName: ctx.request.body.lastName + ', ' + ctx.request.body.firstName,
              initials: (ctx.request.body.firstName.charAt(0) + ctx.request.body.lastName.charAt(0)).toUpperCase(),
              emailAddress: ctx.request.body.emailAddress
          });
            const msg = {
                title: 'New User',
                text: 'new user has been created'
            }
            ctx.body = [{msg}, xPass]
        }
        catch (err) {
            ctx.throw(500, err)
        }
    }
};

// ['Admin', 'Regular', 'Repository Admin', 'Repository', 'None', 'Curator']
