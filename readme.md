## Installation
```bash
npm i discord-database
```
## Latest News!!
↪ Fixed Error When Creating New DB With Custom Name<br/>
↪ You Can Now Set The Database Name In Index.js Bye Inputing The Code Below<br/>
```js
const DB_NAME = 'MyDataBase'; //You Change This
module.exports = {
    DB_NAME: DB_NAME
};
```

## Getting Values
```js
const DB = require('better-database')
const result = await DB.GetValue(message.author.id);
console.log(result.value);
```

## Setting Values
```js
const DB = require('better-database');
DB.SetValue(message.author.id, 1);
```

## Adding Values
```js
const DB = require('better-database');
DB.AddValue(message.author.id, 1);
```

## Subtracting Values
```js
const DB = require('better-database');
DB.SubValue(message.author.id, 1);
```

## Example Usage's
```js
//Pay Command
const DB = require('better-database');
DB.AddValue(person, amount);
DB.SubValue(message.author.id, amount);
//You Need To Define <person> and <amount>
```

## Links
[Discord](https://discord.gg/yv3s3b97Sn)
