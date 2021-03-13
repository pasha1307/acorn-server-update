module.exports = {
    async create(ctx) {
        try {
            const fName = ctx.request.body.firstName.toLowerCase();
            const lName = ctx.request.body.lastName.toLowerCase();
            const mName = ctx.request.body.middleName.toLowerCase();

            const fn = fName.substr(0,1);
            const ln = lName.substr(0,1);
            const fl = (fn + ln).toUpperCase();
            const fCapital = fName.replace(/^\w/, c => c.toUpperCase());
            const lCapital = lName.replace(/^\w/, c => c.toUpperCase());
            const mCapital = mName.replace(/^\w/, c => c.toUpperCase());
            const result = await ctx.db.people.create({
                locationId: ctx.request.body.locationId,
                firstName: ctx.request.body.firstName,
                middleName: mCapital,
                lastName: ctx.request.body.lastName,
                username: ctx.request.body.username,
                userPassword: ctx.request.body.userPassword,
                inactive: 0,
                accessLevel: ctx.request.body.accessLevel,
                displayName: fCapital + " " + lCapital,
                sortName: lCapital + ", " + fCapital,
                initials: fl,
                emailAddress: ctx.request.body.emailAddress,
                // receiveAllDrsEmail: ctx.request.body.emailList,
            });
            const msg = {
                title: 'people',
                text:  `User ${ctx.request.body.lastName}, ${ctx.request.body.firstName}has been created`
            }
            ctx.body = {result, msg}
        }
        catch (err) {
            ctx.throw(500,err)
        }
    }
}

