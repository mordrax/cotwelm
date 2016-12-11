pkill elm-reactor &
pkill node &
sleep 1
# elm game running on 8008

elm reactor --port 8000 &
http-server dist -p 8008 &
sleep 2
browser-sync start --proxy "localhost:8000" --port 5000 --files "**/*.elm" &
browser-sync start --proxy "localhost:8008" --port 5008 --files "dist/js/cotw.js" &

# elm test

# cd tests
# elm reactor --port 1234 &
# sleep 2
# browser-sync start --proxy "localhost:1234" --port 1235 --files "**/*.elm" &
# cd ..