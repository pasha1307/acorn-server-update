const sgMail = require('@sendgrid/mail');
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
                html: `<p>Request For Approval</p><br>
                        <u>ACORN Proposal</u>#${ctx.request.body.pkid}; <u>Repository:</u> ${ctx.request.body.repo}; <u>Call Numbers:</u> ${ctx.request.body.calNums}; <br>
                        <u>Proposed by:</u> ${ctx.request.body.proposedBy}; <u>Curator: </u>${ctx.request.body.curator};<br>
                        <u>Proposed Hours:</u> ${ctx.request.body.hours}; <u>Size: </u>${ctx.request.body.size} <br>
                        <u>Title: </u> ${ctx.request.body.title}, <u>Author\Artist</u>${ctx.request.body.authorArtist}<br> 
                        <u>Treatment:</u> <em>${ctx.request.body.treatment}</em><br><b>Comments:</b><em>${ctx.request.body.comments}</em>`
            };
            sgMail.send(msg);
            ctx.body = [history, msg]

        }
        catch (err) {
            ctx.throw(500, err);
        }
    }
}
