module Utils.Css exposing (..)

transform : Int -> Float -> ( String, String )
transform rotation scale =
    case ( rotation, scale ) of
        ( 0, 1 ) ->
            ( "", "" )

        ( 0, _ ) ->
            ( "transform", "scale" ++ toString ( scale, scale ) )

        ( _, 1 ) ->
            ( "transform", "rotate(" ++ toString rotation ++ "deg)" )

        _ ->
            ( "transform", "rotate(" ++ toString rotation ++ "deg) scale" ++ toString ( scale, scale ) )
