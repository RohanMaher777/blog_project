const { defaultValueSchemable } = require("sequelize/lib/utils")

module.exports = (sequelize, DataTypes) => {
    const blog = sequelize.define ("blog", {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastEditedBy: {
            type: DataTypes.STRING,
            
        },
        isLocked: {
            type: DataTypes.BOOLEAN,
            defaultValue : false
        },
        lockedBy: {
            type: DataTypes.STRING,
        
        },
        unlockedBy: {
            type: DataTypes.STRING,
        
        },
        lockedAt: {
            type: DataTypes.DATE,
        
        }
    },
        {
            paranoid: true,
            timestamps: true,
            deletedAt: 'deleted_At'
        }
    )

    return blog
}