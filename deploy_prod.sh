#!/usr/bin/sh

npm run build
cd build
deployctl deploy --project=omnibar --import-map=import_map.json --prod mod.ts
cd ..