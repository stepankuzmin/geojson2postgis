# geojson2pgsql

[![Build Status](https://travis-ci.org/stepankuzmin/geojson2pgsql.svg?branch=master)](https://travis-ci.org/stepankuzmin/geojson2pgsql)

Insert GeoJSON features into PostGIS database

## Installation

```
npm install geojson2pgsql
```

...or build from source

```shell
git clone https://github.com/stepankuzmin/geojson2pgsql.git
cd geojson2pgsql
npm install
```

## Usage

```shell
Usage: geojson2pgsql [filename] [options]

where [filename] is path to GeoJSON data and [options] is any of:
  --database - database
  --host - database host (default: localhost)
  --port - database port (default: 5432)
  --user - database user (default: postgres)
  --password - database user password
  --version - returns running version then exits
```

```
geojson2pgsql --database moria --user gandalf --password mellon map.geojson
````
