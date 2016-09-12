# geojson2postgis

[![Build Status](https://travis-ci.org/stepankuzmin/geojson2postgis.svg?branch=master)](https://travis-ci.org/stepankuzmin/geojson2postgis)

Insert GeoJSON features into PostGIS database

## Installation

```
npm install geojson2postgis
```

...or build from source

```shell
git clone https://github.com/stepankuzmin/geojson2postgis.git
cd geojson2postgis
npm install
```

## Usage

```shell
Usage: geojson2postgis [filename] [options]

where [filename] is path to GeoJSON data and [options] is any of:
  --database - database
  --host - database host (default: localhost)
  --port - database port (default: 5432)
  --user - database user (default: postgres)
  --password - database user password
  --version - returns running version then exits
```

```
geojson2postgis --database moria --user gandalf --password mellon map.geojson
````
