module.exports = {
    async update(ctx) {
        try {
            const fName = await ctx.request.body.firstName.toLowerCase();
            const lName = await ctx.request.body.lastName.toLowerCase();
            const mName = await ctx.request.body.middleName.toLowerCase();

            const fn = fName.substr(0,1);
            const ln = lName.substr(0,1);
            const fl = (fn + ln).toUpperCase();
            const fCapital = fName.replace(/^\w/, c => c.toUpperCase());
            const lCapital = lName.replace(/^\w/, c => c.toUpperCase());
            const mCapital = mName.replace(/^\w/, c => c.toUpperCase());

            const result = await ctx.db.people.update({
                locationId: ctx.request.body.locationId,
                firstName: fName,
                middleName: mCapital,
                lastName:lName,
                username: ctx.request.body.username,
                userPassword: ctx.request.body.userPassword,
                inactive: ctx.request.body.userInactive,
                accessLevel: ctx.request.body.accessLevel,
                displayName: fCapital + " " + lCapital,
                sortName: lCapital + ", " + fCapital,
                initials: fl,
                emailAddress: ctx.request.body.userEmail,
            }, {
                where: {personId: ctx.params.id}
            });
            const msg = {
                title: 'people',
                text:  `User ${ctx.params.id} has been updated`
            }
            ctx.body = {result, msg};
        }
        catch (err) {
            ctx.throw(500,err)
        }
    }
}
