module Utils.DragDrop
    exposing
        ( DragDrop
        , Msg
        , init
        , view
        , update
        , draggable
        , droppable
        , subscriptions
        )

import Mouse exposing (..)
import Html exposing (..)
import Html.App exposing (map)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Json.Decode as JD exposing (..)
import Maybe exposing (Maybe(Just, Nothing))


type DragDrop source target
    = A (Model source target)


type alias Model source target =
    { dragSource : Maybe source
    , dropTarget : Maybe target
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
        { dragSource = Nothing
        , dropTarget = Nothing
        , position = Position 0 0
        , dragging = Nothing
        }


update : Msg s t -> DragDrop s t -> ( DragDrop s t, Maybe ( Maybe s, Maybe t ) )
update msg (A model) =
    let
        startDrag source html pos =
            Model source model.dropTarget pos (Just (Dragging pos pos html))

        atDrag source html pos =
            Model source model.dropTarget model.position (Maybe.map (\{ start } -> (Dragging start pos html)) model.dragging)
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
            MouseOver dropTarget ->
                ( A { model | dropTarget = dropTarget }, Nothing )

            MouseLeave ->
                ( A { model | dropTarget = Nothing }, Nothing )


view : DragDrop s t -> Html (Msg s t)
view (A ({ dragSource, position, dragging } as model)) =
    let
        px x =
            toString x ++ "px"

        newPos =
            getDisplacement model

        positionStyle =
            style
                [ ( "top", px newPos.y )
                , ( "left", px newPos.x )
                , ( "position", "absolute" )
                , ( "cursor", "move" )
                ]

        pointerEventStyle =
            style [ ( "pointer-events", "none" ) ]
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
getDisplacement { dragSource, dropTarget, position, dragging } =
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
        dragSource =
            Just source

        onMouseDown =
            onWithOptions "mousedown"
                { stopPropagation = True, preventDefault = True }
                (JD.map (Start dragSource draggableHtml) Mouse.position)

        pointerEventStyle =
            case model.dragging of
                Just _ ->
                    style [ ( "pointer-events", "none" ) ]

                Nothing ->
                    style [ ( "pointer-events", "inherit" ) ]
    in
        div [ onMouseDown, pointerEventStyle ] [ draggableHtml ]


droppable : t -> DragDrop s t -> Html (Msg s t) -> Html (Msg s t)
droppable target (A model) html =
    let
        dropTarget =
            Just target

        borderStyle =
            if model.dropTarget == dropTarget then
                style [ ( "border", "1px solid" ) ]
            else
                style [ ( "border", "none" ) ]

        mouseOverStyle =
            on "mouseover" (JD.succeed <| MouseOver dropTarget)

        mouseLeaveStyle =
            onMouseLeave MouseLeave
    in
        div [ mouseOverStyle, mouseLeaveStyle, borderStyle ] [ html ]


subscriptions : DragDrop s t -> List (Sub (Msg s t))
subscriptions (A model) =
    case model.dragSource of
        Nothing ->
            [ Sub.none ]

        source ->
            case model.dragging of
                Just { html } ->
                    [ Mouse.moves (At source html)
                    , Mouse.ups (End model.dragSource model.dropTarget)
                    ]

                _ ->
                    [ Sub.none ]
