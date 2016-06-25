#!/bin/sh -xe

echo "export default '`git rev-parse HEAD`';" > config/revision.js
