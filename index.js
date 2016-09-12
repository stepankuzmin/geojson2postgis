#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const Knex = require('knex');
const minimist = require('minimist');
const packagejson = require('./package.json');
const geojson2pgsql = require('./src/geojson2pgsql.js');

const config = minimist(process.argv.slice(2), {
  string: [
    'database',
    'host',
    'port',
    'user',
    'password'
  ],
  alias: {
    h: 'help',
    d: 'database',
    h: 'host',
    p: 'port',
    u: 'user',
    P: 'password'
  },
  default: {
    host: 'localhost',
    port: 5432,
    user: 'postgres'
  }
});

if (config.version) {
  console.log(packagejson.version);
  process.exit(0);
};

if (config.help) {
  var usage = [
      ''
    , '  Usage: geojson2pgsql [filename] [options]'
    , ''
    , '  where [filename] is path to GeoJSON data and [options] is any of:'
    , '    --database - database'
    , '    --host - database host (default: ' + config.host + ')'
    , '    --port - database port (default: ' + config.port + ')'
    , '    --user - database user (default: ' + config.user + ')'
    , '    --password - database user password'
    , '    --version - returns running version then exits'
    , ''
    , 'geojson2pgsql@' + packagejson.version
    , 'node@' + process.versions.node
  ].join('\n')
  console.log(usage);
  process.exit(0);
};

const fileName = config['_'][0];

if (!fileName) {
  console.error('Error: No input GeoJSON file specified');
  process.exit(-1);
};

const db = Knex({
  debug: false,
  client: 'postgresql',
  connection: {
    database: config.database,
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password
  },
  pool: {
    min: 2,
    max: 10
  }
});

const tableName = path.parse(fileName).name;
const geojson = JSON.parse(fs.readFileSync(fileName));

geojson2pgsql(db, tableName, geojson).then(function (result) {
  console.log(`${result.rowCount} rows inserted`);
  return db.destroy();
}).catch(function(error) {
  console.error('Error:', error)
});

module.exports = geojson2pgsql;
