module.exports = {
    async find(ctx) {
        try {
            ctx.body = await ctx.db.people.findAll({
                where: {username: ctx.params.username},
                attributes: ['displayName'],
                include: [
                    {model: ctx.db.Record,
                        where: {inactive: 0 },
                        attributes: ['recordType', 'recordId', 'authorArtist', 'title', 'dateOfObject', 'approvingCuratorId'],
                        include: [
                            {model: ctx.db.itemProposal, attributes: ['proposalId']},
                            {model: ctx.db.callNumbers, attributes: ['callNumber']}
                            ]
                    }
                ]
            })
        }
        catch (e) {
            ctx.throw(500, e);
        }
    }
}