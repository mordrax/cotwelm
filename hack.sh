#!/bin/bash
# This assumes the source dir is $(pwd)/src

FILENAME="$1"

NAMESPACE_PREFIX="_mordrax\$cotwelm"
ELMSTUFF="$(pwd)/elm-stuff"
ELMDIST="$(pwd)/dist/js/cotw.js"

echo "Namespace prefix: " $NAMESPACE_PREFIX
echo "elm-stuff: " $ELMSTUFF
echo "output: " $ELMDIST

if [ ! -d "$ELMSTUFF" ]; then
    echo "Fail! $ELMSTUFF was not found, try a full make instead?"
    exit -1
fi


if [ ! -f "$ELMDIST" ]; then
    echo "Fail! $ELMDIST was not found, try a full make instead?"
    exit -1
fi

elm-format --yes "./$FILENAME"
RES=$?
if [ $RES != 0 ]; then
    exit $RES
fi
echo "elm-format - ok"

elm-make "./$FILENAME" --output=/dev/null
RES=$?
if [ $RES != 0 ]; then
    exit $RES
fi
echo "elm-make ./${FILENAME} - ok"

MODULE="${FILENAME/.elm/}"
MODULE="${MODULE/src\//}"
MODULE="$(printf $MODULE | awk '{gsub("/","."); print}')"

MANGLED="${NAMESPACE_PREFIX}\$$(printf $MODULE | awk '{gsub("[.]","_"); print}')\$"
echo "Namespace: " $MANGLED

ELMO="$(printf $MODULE | awk '{gsub("[.]","-"); print}').elmo"
ELMO="$(find $ELMSTUFF -iname $ELMO)"
echo "Elmo: " $ELMO

MANGLEDREGX="$(printf $MANGLED | awk '{gsub("[$]","\\$"); print}')"
echo "Namespace to replace: " $MANGLEDREGX

FIRSTLINE=$(cat $ELMDIST | grep -n "^var $MANGLEDREGX" | head -1 | cut -d":" -f1)

if [ "Z$FIRSTLINE" == "Z" ]; then
    echo "Fail! $MODULE was not found, try a full make instead?"
    exit -1
fi
echo "First line found at: " $FIRSTLINE

LAST=$(cat $ELMDIST | grep -n "^var $MANGLEDREGX" | tail -1 | cut -d":" -f1)
LAST=$((LAST+1))

LASTFUNCTIONSIZE=$(tail -n +$LAST $ELMDIST | grep -n "^var ${NAMESPACE_PREFIX}" | head -1 | cut -d":" -f1)

LASTLINE=$((LAST+LASTFUNCTIONSIZE-2))
echo "Last line found at: " $LASTLINE

head -$((FIRSTLINE-1)) $ELMDIST > elm-hack.js
cat $ELMO >> elm-hack.js
tail -n +$((LASTLINE+1)) $ELMDIST >> elm-hack.js

mv elm-hack.js $ELMDIST