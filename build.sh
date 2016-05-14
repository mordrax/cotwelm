#!/bin/bash

echo '====================================================='
echo '============           elm make          ============'
echo '====================================================='
elm make main.elm --output index.html

#inject semantic ui css
echo -n 'Injecting Semantic UI CSS ...............'
sed -i -e 's/style><script/style><link rel="stylesheet" type="text\/css" href="public\/css\/semantic\/semantic.min.css"\/><script/g' index.html
echo 'OK!'

echo -n 'Updating index.php from index.html........'
cp index.html index.php
echo 'OK!'

if [[ $# -eq 0 ]]
then
  echo 'No commit message detected, exiting.....BYE!'
  exit 1
fi

echo -n 'Commiting changes........................'
git commit -m "${1}"
echo 'OK!'

echo -n 'Pushing changes to repo..................'
git push
echo 'OK!'

echo 'Deploying changes to heroku.................'
git push heroku master
echo '............................................OK!'