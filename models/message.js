module.exports = function(sequelize, DataTypes) {
    var Message = sequelize.define("Message", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    handle: { 
      type: DataTypes.TEXT,
    len: [1,30]
    },
    avatar: {
      type: DataTypes.STRING
    },
    timestamp: {
      type: DataTypes.STRING
    },
    source: {
      type: DataTypes.TEXT,
      len: [1,50] 
    },
    content: {
      type: DataTypes.TEXT  
    },
    score: {
      type: DataTypes.INTEGER  
    },
    isStarred: {
      type: DataTypes.BOOLEAN
    },
    isTrashed: {
      type: DataTypes.BOOLEAN
    }
}, {
  timestamps: false
});

    return Message;
  };
  