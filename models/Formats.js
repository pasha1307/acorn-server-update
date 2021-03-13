module.exports = function(sequelize, DataTypes) {
    const formats = sequelize.define('formats', {
        formatId: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            autoIncrement:true,
            allowNull: false,
            primaryKey: true,
            field: 'FormatID'
        },
        format: {
            type: DataTypes.STRING(255),
            allowNull: false,
            field: 'Format'
        },
        inactive: {
            type: DataTypes.INTEGER(1).UNSIGNED,
            allowNull: true,
            defaultValue: '0',
            field: 'Inactive'
        },
        rank: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            allowNull: false,
            defaultValue: '500',
            field: 'Rank'
        }
    }, {
        tableName: 'Formats',
        timestamps: false
    });
    // formats.associate = models => {
    //     formats.belongsTo(models.items, {foreignKey: 'FormatID'})
    // }
    return formats
};
