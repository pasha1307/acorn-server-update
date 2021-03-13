module.exports = {
    async find(ctx) {
        try {
            ctx.body = await ctx.db.itemIdentification.findAll({
                limit: 300,
                include: [
                    {
                        model: ctx.db.items, attributes: ['ItemID', 'identificationId'],
                        include: [ {model: ctx.db.initialCounts }],
                    },
                    {
                        model: ctx.db.Record,
                        attributes: ['recordId', 'recordType', 'identificationId']
                    }
                ],
                order: [
                    [
                        'IdentificationId', 'DESC'
                    ]
                ],

        }) }
        catch (err) {
          ctx.throw(500, err)
        }

    }
}
// FOR ITEMS model
// include: [
//     {
//         model: ctx.db.Record,
//         attributes: ['RecordID', 'RecordType']
//     },
//     {model: ctx.db.formats, attributes: ['Format']},
//     {
//         model: ctx.db.itemIdentification,
//         attributes: ['identificationId','Title'],
//         include: [
//             {model: ctx.db.locations, attributes: ['Location']}
//         ]
//     },
//     {
//         model: ctx.db.initialCounts,
//         // where: {
//         //     countType: {
//         //         $or: [ 'Volumes','Sheets','Photos','Other','Boxes', null]
//         //     }
//         //
//         // }
//     }
// ]
