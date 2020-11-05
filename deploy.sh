#!/usr/bin/env sh

set -e
npm run _deploy

cd docs

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:meold/vue-awesome-grid.git master:gh-pages

cd -