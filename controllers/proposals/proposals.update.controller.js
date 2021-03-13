module.exports = {
    async update(ctx) {
        try {
            const proposal = await ctx.db.itemProposal.update({
                proposalDate: ctx.request.body.data.proposalDate,
                description: ctx.request.body.data.description,
                condition: ctx.request.body.data.condition,
                treatment: ctx.request.body.data.treatment,
                minimumProposedHours: ctx.request.body.data.minimumProposedHours,
                maximumProposedHours: ctx.request.body.data.maximumProposedHours,
                height: ctx.request.body.data.height,
                width: ctx.request.body.data.width,
                thickness: ctx.request.body.data.thickness,
                dimensionUnit: ctx.request.body.data.dimensionUnit,
                examDate: ctx.request.body.data.examDate,
                examLocationId: ctx.request.body.data.examLocationId
            }, {
                where: {
                    proposalId: ctx.params.id
                }
            });
            const delProposed = await ctx.db.proposedBy.destroy({
                where: {
                    proposalId: ctx.params.id
                }
            });
            const proposedBy = await ctx.request.body.proposedBy.map((el,index) => {
                ctx.db.proposedBy.create({
                    personId: el,
                    proposalId: ctx.params.id
                })
            });

            ctx.body = [proposal, proposedBy];

        }
        catch (err) {
            ctx.throw(500, err);
        }
    }
};
