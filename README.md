# Castle of the Winds in Elm

Castle of the Winds is a tile-based RPG made by Rick Saada in the late 80s. Many old school RPGers remember the game with fond memories and as such, this is my [~~first~~](https://github.com/mordrax/CoTWjs/) [~~second~~](https://github.com/mordrax/cotwmtor) third attempt to port the game into the modern era to be playable on mobile and web browsers.

Checkout the progress here: [game.castleofthewinds.com](http://game.castleofthewinds.com)

# Running from source

Assuming you have npm installed.

- `npm install -g elm` or [here](https://www.npmjs.com/package/elm) for official instructions.
- `git clone https://github.com/mordrax/cotwelm/`
- `./build.sh` OR if you don't trust my `.sh` it just runs `elm make src/make.elm dist/js/cost.js`
- Open `dist/index.html` in your favourite browser (as long as it's Chrome)

If you'd like to hack on it, the `./dev.sh` script is nice to get auto refreshing of the browser. To do this you will need the `http-server` and `browser-sync` packages off npm as well. It should open up ports 5000 for elm reactor and 5008 for the html version with external semantic ui css.

# Devlog

Herein is chronicled the third attempt at writing a game, musings on the meaning of life and general rants!

https://mordrax.github.io/cotwmtor/
