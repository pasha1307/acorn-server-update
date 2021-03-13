module.exports = {
    async find(ctx) {
        try {
            const projects = await ctx.db.projects.findAll({
                where: {
                    ProjectName: {
                        $ne: ''
                    },
                    inactive: 0
                },
                attributes: ['projectId', 'projectName'],
                order: [['projectName', 'ASC']]
            });
            const groups = await ctx.db.groups.findAll({
                where: {inactive: 0},
                attributes: ['groupId','groupName']
            });
            const repos = await ctx.db.locations.findAll({
                order:[['location', 'ASC']],
                where: {isRepository: 1},
                attributes: ['locationId', 'location', 'tub'],
                include: [{model: ctx.db.departments}]
            });
            const locations = await ctx.db.locations.findAll({
                order:[['location', 'ASC']],
                attributes: ['locationId', 'location', 'tub'],
                where: {
                    isWorkLocation: 1
                }
            })
            const formats = await ctx.db.formats.findAll({
                where: {inactive: 0},
                order: [['format']]
            });
            const  purposes = await ctx.db.purposes.findAll({
                order: [['purpose', 'ASC']]
            });

            const charges = await ctx.db.chargeto.findAll({
                where : {
                    ChargeToName: {
                        $ne: ''
                    }
                },
                attributes: ['ChargeToID','ChargeToName', 'ChargeToType'],
                order: [['ChargeToName']]
            });
            const rstorage = await ctx.db.storage.findAll({
                where: {inactive: 0}
            });
            const worktypes = await ctx.db.workTypes.findAll({
                where: {
                    inactive: {
                        $ne: 1
                    }
                },
                order: [['workType']]
            });
            const importance = await ctx.db.importances.findAll({
                where: {inactive: 0}
            });
            const autotext = await ctx.db.autotext.findAll({
                where: {
                    autotext: {
                        $ne: null
                    }
                },
                order: [['autotext']]
            });

            ctx.body = [
                {'Projects': projects},
                {'Repos': repos},
                {'Locations': locations},
                {'Formats': formats},
                {'Groups': groups},
                {'Purposes': purposes},
                {'Charges': charges},
                {'Rstorage': rstorage},
                {'WorkTypes': worktypes},
                {'Importance': importance},
                {'Autotext': autotext}
                ]
        }
        catch (err) {
            ctx.throw(500, ctx.err)
        }

    }
}
