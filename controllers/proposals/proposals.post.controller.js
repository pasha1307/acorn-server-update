module.exports = {
    async create(ctx) {
        try {
            const proposal = await ctx.db.itemProposal.create({
                identificationId: ctx.request.body.identificationId,
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
            });
            const proposedBy = await ctx.request.body.data.proposedBy.map((el,index) => {
                ctx.db.proposedBy.create({
                    personId: el,
                    proposalId: proposal.proposalId
                })
            });

            ctx.body = [proposal, proposedBy];
            // insert into ItemProposal
            // insert in proposedBy - array
            // may be to add record id, or to relate by the identificationId
        }
        catch (err) {
            ctx.throw(500, err);
        }
    }
};
