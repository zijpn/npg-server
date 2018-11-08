# Network PlayGround

[![build](https://travis-ci.org/zijpn/npg-server.svg?branch=master)](https://travis-ci.org/zijpn/npg-server)
[![dependencies Status](https://david-dm.org/zijpn/npg-server/status.svg)](https://david-dm.org/zijpn/npg-server)

[![maintainability](https://api.codeclimate.com/v1/badges/975c607f39e3d921a7aa/maintainability)](https://codeclimate.com/github/zijpn/npg-server/maintainability)
[![test coverage](https://api.codeclimate.com/v1/badges/975c607f39e3d921a7aa/test_coverage)](https://codeclimate.com/github/zijpn/npg-server/test_coverage)

## API

The `schema/api/npgapi.json` is based on the [AsyncAPI] specification. <br>
Old OAS3 https://app.swaggerhub.com/apis/npg/server/1.0.0

#### Docgen
```
npx adg schema/api/npgapi.json
```
https://github.com/asyncapi/docgen/issues/32

#### Codegen

TBC

## Projects

Projects are stored as JSON files and validated by the `schema/project/schema.json` [schema]. <br>
The schema file was generated from `schema/project/example.json`, using [quicktype.io].

[API]: https://app.swaggerhub.com/apis/npg/server/1.0.0
[AsyncAPI]: https://www.asyncapi.com
[schema]: https://spacetelescope.github.io/understanding-json-schema/
[quicktype.io]: https://app.quicktype.io/