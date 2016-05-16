#!/bin/bash

echo '====================================================='
echo '============           elm make          ============'
echo '====================================================='
elm make src/main.elm --output index.html

#inject semantic ui css
echo -n 'Injecting Semantic UI CSS ...............'
sed -i -e 's/style><script/style><link rel="stylesheet" type="text\/css" href="public\/css\/semantic\/semantic.min.css"\/><script>(function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,"script","https:\/\/www.google-analytics.com\/analytics.js","ga");ga("create", "UA-66886988-3", "auto");ga("send", "pageview");<\/script><script/g' index.html
sed -i -e 's/<body>/<body><?php include_once("analyticstracking.php") ?>/g' index.html
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