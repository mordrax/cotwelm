module DragDrop
    exposing
        ( DragDrop
        , Drag(..)
        , Drop(..)
        , DragDropMsg(..)
        , new
        , view
        , update
        , draggable
        , droppable
        , getDragSourceDropTarget
        , subscriptions
        )

import Mouse exposing (..)
import Html exposing (..)
import Html.App exposing (map)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Json.Decode as JD exposing (..)


type DragDrop source target
    = DragDropModel (Model source target)


type alias Model source target =
    { dragSource : Drag source
    , dropTarget : Drop target
    , position : Position
    , dragging : Maybe (Dragging source target)
    }


type Drag a
    = DragSource a
    | NoDrag


type Drop a
    = DropTarget a
    | NoDrop


type alias Dragging source target =
    { start : Position
    , current : Position
    , html : Html (DragDropMsg source target)
    }


type DragDropMsg source target
    = Start (Drag source) (Html (DragDropMsg source target)) Position
    | At (Drag source) (Html (DragDropMsg source target)) Position
    | End Position
    | MouseOver (Drop target)
    | MouseLeave


new : DragDrop s t
new =
    DragDropModel
        { dragSource = NoDrag
        , dropTarget = NoDrop
        , position = Position 0 0
        , dragging = Nothing
        }


getDragSourceDropTarget : DragDrop a b -> ( Drag a, Drop b )
getDragSourceDropTarget (DragDropModel model) =
    ( model.dragSource, model.dropTarget )


update : DragDropMsg s t -> DragDrop s t -> DragDrop s t
update msg (DragDropModel model) =
    let
        startDrag =
            \source html pos -> Model source model.dropTarget pos (Just (Dragging pos pos html))

        atDrag =
            \source html pos -> Model source model.dropTarget model.position (Maybe.map (\{ start } -> (Dragging start pos html)) model.dragging)
    in
        case msg of
            Start source html pos ->
                (DragDropModel (startDrag source html pos))

            At source html pos ->
                DragDropModel <| atDrag source html pos

            -- on drag end, check if it's over a droppable container
            End _ ->
                Debug.crash "This needs to be handled higher up, DragDrop currently does not know how to tell the parent how to handle the End event"

            --(handleMouseUp model)
            MouseOver dropTarget ->
                DragDropModel { model | dropTarget = dropTarget }

            MouseLeave ->
                DragDropModel { model | dropTarget = NoDrop }


view : DragDrop s t -> Html (DragDropMsg s t)
view (DragDropModel ({ dragSource, position, dragging } as model)) =
    let
        px =
            \x -> toString x ++ "px"

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
draggable : Html (DragDropMsg a b) -> a -> DragDrop c d -> Html (DragDropMsg a b)
draggable draggableHtml source (DragDropModel model) =
    let
        dragSource =
            DragSource source

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


droppable : t -> DragDrop s t -> Html (DragDropMsg s t) -> Html (DragDropMsg s t)
droppable target (DragDropModel model) html =
    let
        dropTarget =
            DropTarget target

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


subscriptions : DragDrop s t -> List (Sub (DragDropMsg s t))
subscriptions (DragDropModel model) =
    case model.dragSource of
        NoDrag ->
            [ Sub.none ]

        source ->
            case model.dragging of
                Just { start, current, html } ->
                    [ Mouse.moves (At source html), Mouse.ups End ]

                _ ->
                    [ Sub.none ]
