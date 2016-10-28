module Utils.DragDrop
    exposing
        ( DragDrop
        , Msg
        , init
        , view
        , update
        , draggable
        , droppable
        , subscription
        )

import Mouse exposing (..)
import Html exposing (..)
import Html.App exposing (map)
import Html.Attributes as HA
import Html.Events as HE
import Json.Decode as JD exposing (..)
import Maybe exposing (Maybe(Just, Nothing))


type DragDrop source target
    = A (Model source target)


type alias Model source target =
    { source : Maybe source
    , target : Maybe target
    , position : Position
    , dragging : Maybe (Dragging source target)
    }


type alias Dragging source target =
    { start : Position
    , current : Position
    , html : Html (Msg source target)
    }


type Msg source target
    = Start (Maybe source) (Html (Msg source target)) Position
    | At (Maybe source) (Html (Msg source target)) Position
    | End (Maybe source) (Maybe target) Position
    | MouseOver (Maybe target)
    | MouseLeave


init : DragDrop s t
init =
    A
        { source = Nothing
        , target = Nothing
        , position = Position 0 0
        , dragging = Nothing
        }


update : Msg s t -> DragDrop s t -> ( DragDrop s t, Maybe ( Maybe s, Maybe t ) )
update msg (A model) =
    let
        startDrag source html pos =
            Model source model.target pos (Just (Dragging pos pos html))

        atDrag source html pos =
            Model source model.target model.position (Maybe.map (\{ start } -> (Dragging start pos html)) model.dragging)
    in
        case msg of
            Start source html pos ->
                ( A (startDrag source html pos), Nothing )

            At source html pos ->
                ( A <| atDrag source html pos, Nothing )

            -- on drag end, check if it's over a droppable container
            End s t _ ->
                ( A model, Just ( s, t ) )

            --(handleMouseUp model)
            MouseOver target ->
                ( A { model | target = target }, Nothing )

            MouseLeave ->
                ( A { model | target = Nothing }, Nothing )


view : DragDrop s t -> Html (Msg s t)
view (A ({ source, position, dragging } as model)) =
    let
        px x =
            toString x ++ "px"

        newPos =
            getDisplacement model

        positionStyle =
            HA.style
                [ ( "top", px newPos.y )
                , ( "left", px newPos.x )
                , ( "position", "absolute" )
                , ( "cursor", "move" )
                ]

        pointerEventStyle =
            HA.style [ ( "pointer-events", "none" ) ]
    in
        case model.dragging of
            Just { start, current, html } ->
                div [ positionStyle, pointerEventStyle ] [ html ]

            _ ->
                div [] []


{-| DnDModel tracks where the mouse starts and where it currently is to get the absolute
movement from when mouse down happens. This is the actual drag distance.
-}
getDisplacement : Model s t -> Position
getDisplacement { source, target, position, dragging } =
    case dragging of
        Nothing ->
            position

        Just { start, current } ->
            Position (position.x + current.x - start.x)
                (position.y + current.y - start.y)


{-| Takes a html snippet that can be dragged and drag it around the screen.
The snippet is attached to a arbitrary Drag source which is given to the Drop target when dropped.
-}
draggable : Html (Msg a b) -> a -> DragDrop c d -> Html (Msg a b)
draggable draggableHtml source (A model) =
    let
        onMouseDown =
            HE.onWithOptions "mousedown"
                { stopPropagation = True, preventDefault = True }
                (JD.map (Start (Just source) draggableHtml) Mouse.position)

        pointerEventStyle =
            case model.dragging of
                Just _ ->
                    HA.style [ ( "pointer-events", "none" ) ]

                Nothing ->
                    HA.style [ ( "pointer-events", "inherit" ) ]
    in
        div [ onMouseDown, pointerEventStyle ] [ draggableHtml ]


droppable : t -> DragDrop s t -> Html (Msg s t) -> Html (Msg s t)
droppable dropTarget (A model) html =
    let
        target =
            Just dropTarget

        borderStyle =
            if model.target == target then
                HA.style [ ( "border", "1px solid" ) ]
            else
                HA.style [ ( "border", "none" ) ]

        mouseOverStyle =
            HE.on "mouseover" (JD.succeed <| MouseOver target)

        mouseLeaveStyle =
            HE.onMouseLeave MouseLeave
    in
        div [ mouseOverStyle, mouseLeaveStyle, borderStyle ] [ html ]


subscription : DragDrop s t -> Sub (Msg s t)
subscription (A model) =
    case model.source of
        Nothing ->
            Sub.none

        source ->
            case model.dragging of
                Just { html } ->
                    Sub.batch
                        [ Mouse.moves (At source html)
                        , Mouse.ups (End model.source model.target)
                        ]

                _ ->
                    Sub.none
