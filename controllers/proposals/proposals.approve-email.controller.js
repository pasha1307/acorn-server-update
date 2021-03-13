const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
sgMail.setApiKey('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');
module.exports = {
    async create(ctx) {
        try {
            const history = await ctx.db.proposalApprovalHistory.create({
                pkid: ctx.request.body.pkid,
                recordType: 'Item',
                activityType: ctx.request.body.activityType,
                details: ctx.request.body.comments,
                authorId: ctx.request.body.authorId,
                dateEntered: new Date()
            });
            const msg = {
                to: ctx.request.body.to,
                from: ctx.request.body.from,
                subject: ctx.request.body.subject,
                text: ctx.request.body.comments,
                html: `<b>ACORN Proposal</b> #${ctx.request.body.pkid}; <br>
                        <u>Approval Status:</u> <b>${ctx.request.body.activityType}</b><br>
                        <u>Comments:</u> <em>${ctx.request.body.comments}</em>`
            };
            sgMail.send(msg)
            ctx.body = [history, msg];
        }
        catch (err) {
            ctx.throw(500, err);
        }
    }
}
