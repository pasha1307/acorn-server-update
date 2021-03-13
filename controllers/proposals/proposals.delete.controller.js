module.exports = {
    async destroy(ctx) {
        try {
            const proposal = await ctx.db.itemProposal.destroy({
                where: {
                    proposalId: ctx.params.id
                }
            });
            const history = await ctx.db.proposalApprovalHistory.destroy({
                where: {
                    pkid: ctx.params.id
                }
            });
            const msg = {
            title: 'Proposal',
            text:  `Proposal ${ctx.params.id} has been deleted`
        }
        ctx.body = {proposal, msg};
        }
        catch (err) {
            ctx.throw(500, ctx.err)
        }
    }
}
