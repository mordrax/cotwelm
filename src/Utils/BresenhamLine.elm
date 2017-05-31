module Utils.BresenhamLine exposing (line)

import List
import Utils.Vector exposing (Vector)


line : Vector -> Vector -> List Vector
line ( ax, ay ) ( bx, by ) =
    if ax == bx then
        vline ax ay by
    else if ay == by then
        hline ay ax bx
    else
        line_ ( ax, ay ) ( bx, by )


line_ : Vector -> Vector -> List Vector
line_ ( ax, ay ) ( bx, by ) =
    let
        dy =
            toFloat (by - ay)

        dx =
            toFloat (bx - ax)
    in
    if abs dx > abs dy then
        let
            f =
                \x ->
                    slope * toFloat (x - ax)

            slope =
                dy / dx
        in
        if ax > bx then
            List.reverse (line_ ( bx, by ) ( ax, ay ))
        else
            List.range ax bx
                |> List.map (\x -> ( x, round (f x) + ay ))
    else
        let
            f =
                \y ->
                    slope * toFloat (y - ay)

            slope =
                dx / dy
        in
        if ay > by then
            List.reverse (line_ ( bx, by ) ( ax, ay ))
        else
            List.range ay by
                |> List.map (\y -> ( round (f y) + ax, y ))


hline : Int -> Int -> Int -> List Vector
hline y x0 x1 =
    if x1 < x0 then
        List.reverse (hline y x1 x0)
    else
        List.map (\x -> ( x, y )) (List.range x0 x1)


vline : Int -> Int -> Int -> List Vector
vline x y0 y1 =
    if y1 < y0 then
        List.reverse (vline x y1 y0)
    else
        List.map (\y -> ( x, y )) (List.range y0 y1)
