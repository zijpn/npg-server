# Network PlayGround

[![build](https://travis-ci.org/zijpn/npg-server.svg?branch=master)](https://travis-ci.org/zijpn/npg-server)
[![dependencies Status](https://david-dm.org/zijpn/npg-server/status.svg)](https://david-dm.org/zijpn/npg-server)

[![maintainability](https://api.codeclimate.com/v1/badges/975c607f39e3d921a7aa/maintainability)](https://codeclimate.com/github/zijpn/npg-server/maintainability)
[![test coverage](https://api.codeclimate.com/v1/badges/975c607f39e3d921a7aa/test_coverage)](https://codeclimate.com/github/zijpn/npg-server/test_coverage)

## API

The [API] is based on the OpenAPI specification ([OAS]).

## Backend

Uses [calico] with docker. Calico implements a Docker network plugin that provides routing and network policy for Docker containers.

## Projects

Projects are stored as JSON files and validated by a [schema].

[API]: https://app.swaggerhub.com/apis/npg/server/1.0.0
[OAS]: https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md
[calico]: https://docs.projectcalico.org/v2.6/getting-started/docker/
[schema]: https://spacetelescope.github.io/understanding-json-schema/
