
elm reactor --port 8000 &
http-server dist -p 8008 &
sleep 1
browser-sync start --proxy "localhost:8000" --port 5000 --files "**/*.elm" &
browser-sync start --proxy "localhost:8008" --port 5008 --files "dist/js/cotw.js" &

