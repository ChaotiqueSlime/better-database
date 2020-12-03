const Sequelize = require('sequelize');
const queuing = require("./queue.js");
const dbQueue = new queuing();  
var keysolution = 'Value Database Loaded | For Support Or Help Join Our Discord https://discord.gg/yv3s3b97Sn';
var index = require('../../index');
if(!index.DB_NAME) {
  console.log(`There Is Not DB_NAME in Index.js | Originating To Default Database Name`);
  var NAME = `default`;
}
const sequelize = new Sequelize('database', 'Awesome', '132435465768798', {
host: 'localhost',
dialect: 'sqlite',
logging: false,
storage: `${NAME || index.DB_NAME}.sqlite`,
});
const DB = sequelize.define('Value', {
userID: {
type: Sequelize.STRING,
unique: true,
},
value: Sequelize.INTEGER,
});
DB.sync()
console.log(`${keysolution}`);
module.exports = {
SetValue: function(UserID, toSet) {
    return dbQueue.addToQueue({
    "value": this.Func_SetValue.bind(this),
    "args": [UserID, toSet]
    });
  },
GetValue: function(UserID) {
    return dbQueue.addToQueue({
    "value": this.Func_GetValue.bind(this),
    "args": [UserID]
    });
  },
AddValue: function(UserID, toAdd) {
    return dbQueue.addToQueue({
    "value": this.Func_AddValue.bind(this),
    "args": [UserID, toAdd]
    });
  },
SubValue: function(UserID, toSubtract) {
    return dbQueue.addToQueue({
    "value": this.Func_SubValue.bind(this),
    "args": [UserID, toSubtract]
    });
  },
Func_SetValue: async function(UserID, toSet) {if(!UserID) throw new Error('function is missing parameters!');if(!toSet && toSet != 0) throw new Error('function is missing parameters!');if(!parseInt(toSet)) throw new Error('function parameter toSet needs to be a number!');toSet = parseInt(toSet);
return new Promise(async (resolve, error) => {
const Info = await DB.update({
value: toSet
}, {
where: {
userID: UserID
}
});
if (Info > 0) {
return resolve({
userid: UserID,
value: toSet
})
} else {
try {
const Info2 = await DB.create({
userID: UserID,
value: 0
});
return resolve({
userid: UserID,
value: toSet
})
} catch (e) {if(e.name === 'SequelizeUniqueConstraintError') {return resolve(`Duplicate Found, shouldn\'t happen in this function, check typo\'s`);}return error(e);}}});},
Func_GetValue: async function(UserID) {if(!UserID) throw new Error('GetValue function is missing parameters!');
return new Promise(async (resolve, error) => {
const Info = await DB.findOne({
where: {
userID: UserID
}
});
if (Info) {
return resolve({
userid: Info.userID,
value: Info.value
})
}
try {
const Info2 = await DB.create({
userID: UserID,
value: 0
});
return resolve({
userid: UserID,
value: 0
})
} catch (e) {
if(e.name === 'SequelizeUniqueConstraintError') {return resolve(`Duplicate Found, shouldn\'t happen in this function, check typo\'s`);}return error(e);}});},
Func_AddValue: async function(UserID, toAdd) {if(!UserID) throw new Error('AddValue function is missing parameters!');if(!toAdd && toAdd != 0) throw new Error('AddValue function is missing parameters!');if(!parseInt(toAdd)) throw new Error('AddValue function parameter toAdd needs to be a number!');toAdd = parseInt(toAdd);
return new Promise(async (resolve, error) => {
const Info = await DB.findOne({
where: {
userID: UserID
}
});
if(Info) {
const Info2 = await DB.update({
value: Info.value + toAdd
}, {
where: {
userID: UserID
}
});
if(Info2 > 0) {
return resolve({
userid: UserID,
oldvalue: Info.value,
newvalue: Info.value + toAdd,
})
}
return error('Something went wrong in function AddValue');}return resolve('ID has no record in database!');});},
Func_SubValue: async function(UserID, toSubtract) {if(!UserID) throw new Error('SubValue function is missing parameters!');if(!toSubtract && toSubtract != 0) throw new Error('SubValue function is missing parameters!');if(!parseInt(toSubtract)) throw new Error('SubValue function parameter toSubtract needs to be a number!');toSubtract = parseInt(toSubtract);
return new Promise(async (resolve, error) => {
const Info = await DB.findOne({
where: {
userID: UserID
}
});
if(Info) {
const Info2 = await DB.update({
value: Info.value - toSubtract
}, {
where: {
userID: UserID
}
});
if(Info2 > 0) {
return resolve({
userid: UserID,
oldvalue: Info.value,
newvalue: Info.value - toSubtract
})
}
return error('Something went wrong in function SubValue');}return resolve('ID has no record in database!');});},}
