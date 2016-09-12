const path = require('path');
const test = require('tape');
const Knex = require('knex');
const geojson2postgis = require('../src/geojson2postgis.js');

const db = Knex({
  debug: false,
  client: 'postgresql',
  connection: {
    database: 'test',
    user: 'postgres'
  },
  pool: {
    min: 2,
    max: 10
  }
});

const geojson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: 'Moscow' },
      geometry: { type: 'Point', coordinates: [37.617778, 55.755833] }
    },
    {
      type: 'Feature',
      properties: { name: 'Yekaterinburg' },
      geometry: { type: 'Point', coordinates: [60.583333, 56.833333,] }
    }
  ]
};

test('geojson2postgis', (t) => {
  t.plan(2);

  geojson2postgis(db, 'test', geojson).then(function (result) {
    t.ok(result);

    db('test').select(
      'properties',
      db.raw('st_asgeojson(geom) as geometry')
    ).then(function(rows) {
      const features = rows.map(row => ({
        type: 'Feature',
        properties: row.properties,
        geometry: JSON.parse(row.geometry)
      }));

      t.deepEqual(features, geojson.features);
      t.end();
      return db.destroy();
    });
  }).catch(function(error) {
    console.error('Error:', error)
    t.error(error);
    t.end();
  });
});
