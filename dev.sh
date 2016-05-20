
elm-reactor &
http-server dist &
browser-sync start --proxy "localhost:8080" --files "dist/js/cotw.js" &
browser-sync start --proxy "localhost:8000" --files "**/*.elm" &
