#!/bin/bash

echo '====================================================='
echo '============           elm make          ============'
echo '====================================================='
elm make src/main.elm --output dist/js/cotw.js

if [[ $# -eq 0 ]]
then
  echo 'No commit message detected, exiting.....BYE!'
  exit 1
fi

echo -n 'Commiting changes........................'
git commit -am "${1}"
echo 'OK!'

echo -n 'Pushing changes to repo..................'
git push
echo 'OK!'

echo 'Deploying changes to heroku.................'
./deploy.sh
echo '............................................OK!'
