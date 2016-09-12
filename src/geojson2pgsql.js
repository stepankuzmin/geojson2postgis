function geojson2pgsql(db, tableName, geojson) {
  const features = geojson.features.map(function getRow(feature) {
    return {
      geom: db.raw(`st_setsrid(st_geomfromgeojson('${JSON.stringify(feature.geometry)}'), 4326)`),
      properties: feature.properties
    };
  });

  return db.schema.createTableIfNotExists(tableName, function (table) {
    table.jsonb('properties').defaultTo('{}');
    table.specificType('geom', 'geometry(GEOMETRY, 4326)').notNullable();
  }).then(function () {
    return db(tableName).insert(features);
  });
}

module.exports = geojson2pgsql;
