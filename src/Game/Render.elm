module Game.Render exposing (viewport)

import Game.Model exposing (Game)
import Utils.Vector as Vector exposing (Vector)
import Game.Level as Level
import Game.Maps as Maps


{-| Handles all logic and rendering of the game to screen.
-}
viewport : Game -> Game
viewport ({ windowSize, viewport, maps, hero, level } as model) =
    let
        tileSize =
            32

        ( curX, curY ) =
            Vector.scale tileSize hero.position

        ( xOff, yOff ) =
            ( windowSize.width // 2, windowSize.height // 2 )

        tolerance =
            tileSize * 4

        scroll =
            { up = viewport.y + curY <= tolerance
            , down = viewport.y + curY >= (windowSize.height * 4 // 5) - tolerance
            , left = viewport.x + curX <= tolerance
            , right = viewport.x + curX >= windowSize.width - tolerance
            }

        ( mapWidth, mapHeight ) =
            (Level.size level)

        newX =
            if scroll.left || scroll.right then
                clamp (windowSize.width - mapWidth * tileSize) 0 (xOff - curX)
            else
                viewport.x

        newY =
            if scroll.up || scroll.down then
                clamp (windowSize.height * 4 // 5 - mapHeight * tileSize) 0 (yOff - curY)
            else
                viewport.y
    in
        { model | viewport = { x = newX, y = newY } }
