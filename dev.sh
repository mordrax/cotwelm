pkill elm-reactor
pkill node

http-server dist -p 8844 &
sleep 3 &
browser-sync start --proxy "localhost:8844" --port 8888 --files "dist/js/cotw.js" &

# elm test

# cd tests
# elm reactor --port 1234 &
# sleep 2
# browser-sync start --proxy "localhost:1234" --port 1235 --files "**/*.elm" &
# cd ..