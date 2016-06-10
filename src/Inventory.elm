module Inventory
    exposing
        ( view
        , subscriptions
        , update
        , init
        )

{-|
The inventory module predominatelys acts as the user interface for the 'i'nventory and shop screen.
It handles equiping, buy/sell, identification, moving items into packs and other general inventory related logic.

The module subscribes to mouse events for item interactions and is generally high level because it needs
to know about hero equipment, items, containers etc...
-}

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import GameData.Item as Item exposing (..)
import Game.Data exposing (..)
import Container exposing (..)
import Mouse exposing (..)
import Json.Decode as Json exposing (..)
import Equipment exposing (..)
import Maybe.Extra exposing (..)


init : DnDModel
init =
    { draggedItem = Nothing
    , position = Position 0 0
    , dragging = Nothing
    , drop = NoDrop
    , drag = NoDrag
    }



----------
-- View --
----------


view : Game.Data.Model -> Html MouseMsg
view ({ equipment, dnd } as model) =
    let
        pack =
            Equipment.get Equipment.Pack equipment
    in
        viewLayout equipment pack dnd


viewLayout : Equipment -> Maybe Item -> DnDModel -> Html MouseMsg
viewLayout equipment maybePack dnd =
    let
        headerClass =
            class "ui block header"

        header =
            \title -> div [ headerClass ] [ text title ]

        heading =
            \title ->
                span [ class "ui text container segment" ] [ text title ]

        columnWidth =
            \width children -> div [ class (width ++ " wide column") ] children

        equipmentColumn =
            columnWidth "six"
                [ div [ class "ui grid" ]
                    [ viewEquipmentSlots equipment dnd
                    ]
                ]

        shopPackColumn =
            columnWidth "ten" [ shopDiv, packDiv ]

        shopDiv =
            header "Shop"

        packDiv =
            div [] [ header "Pack", viewPack maybePack dnd ]
    in
        div []
            [ heading "Inventory screen"
            , div [ class "ui two column grid" ]
                [ equipmentColumn
                , shopPackColumn
                ]
            , viewDraggedItem dnd
            ]



------------
-- Update --
------------


update : MouseMsg -> Model -> ( Model, Cmd Game.Data.Msg )
update msg ({ dnd } as model) =
    let
        startdnd =
            \item pos drag -> DnDModel (Just item) pos drag (Just (Dragging pos pos)) dnd.drop

        atdnd =
            \item pos -> DnDModel (Just item) dnd.position NoDrag (Maybe.map (\{ start } -> (Dragging start pos)) dnd.dragging) dnd.drop
    in
        case msg of
            Start item drag pos ->
                ( { model | dnd = startdnd item pos drag }, Cmd.none )

            At item pos ->
                ( { model | dnd = atdnd item pos }, Cmd.none )

            -- on drag end, check if it's over a droppable container
            End _ ->
                handleMouseUp model

            MouseOver dropTarget ->
                ( { model | dnd = { dnd | drop = dropTarget } }, Cmd.none )

            MouseLeave ->
                ( { model | dnd = { dnd | drop = NoDrop } }, Cmd.none )



---------------------
-- Drag drop logic --
---------------------


{-| If the mouseup happens on a pack, equipment slot or shop, do something.

Drag
- Shop:
  - Check player can afford item

- Equipment slot:
  - Check it's not cursed

- Pack:
  - Nothing

Drop
- Shop:
  - Nothing

- Equipment slot:
  - Check if an item is already equipped

- Pack
  - Check pack capacity
-}
handleMouseUp : Model -> ( Model, Cmd Game.Data.Msg )
handleMouseUp ({ dnd } as model) =
    let
        modelWithoutDnD =
            { model | dnd = init }

        noChange =
            ( modelWithoutDnD, Cmd.none )
    in
        case ( dnd.draggedItem, dnd.drop ) of
            ( Nothing, _ ) ->
                noChange

            ( _, NoDrop ) ->
                noChange

            ( Just item, drop ) ->
                let
                    {- dragRes =
                       checkDrag item model
                    -}
                    dropRes =
                        checkDrop drop item modelWithoutDnD
                in
                    case dropRes of
                        Ok newModel ->
                            let
                                _ =
                                    Debug.log "New model" 1
                            in
                                ( newModel, Cmd.none )

                        Err _ ->
                            let
                                _ =
                                    Debug.log "Nochange" 1
                            in
                                noChange


{-| checkDrag
- Shop:
  - Check player can afford item

- Equipment slot:
  - Check it's not cursed

- Pack:
  - Nothing
-}
checkDrag : Dragging -> Model -> Result Int Model
checkDrag dragging model =
    case dragging of
        _ ->
            Result.Ok model


{-| checkDrop
- Shop:
  - Nothing

- Equipment slot:
  - Check if an item is already equipped

- Pack
  - Check pack capacity
-}
checkDrop : Drop -> Item -> Model -> Result Int Model
checkDrop drop item model =
    case drop of
        DropPack pack ->
            let
                equipment' =
                    Equipment.update (PutInPack item) model.equipment
            in
                Result.Ok { model | equipment = equipment' }

        DropEquipment slot ->
            Result.Ok model

        NoDrop ->
            Result.Ok model


dropItem : Model -> Model
dropItem ({ equipment, dnd } as model) =
    let
        { draggedItem, position, dragging, drop } =
            dnd
    in
        case ( draggedItem, drop ) of
            ( Nothing, _ ) ->
                model

            ( _, NoDrop ) ->
                model

            ( Just item, DropPack pack ) ->
                let
                    equipment' =
                        Equipment.update (Equipment.PutInPack item) equipment
                in
                    { model | equipment = equipment' }

            ( Just item, DropEquipment slot ) ->
                Debug.crash "TODO: drop equipment"



---------------
-- Drag Drop --
---------------


droppableDiv : Drop -> DnDModel -> Html MouseMsg -> Html MouseMsg
droppableDiv drop model html =
    let
        borderStyle =
            if model.drop /= NoDrop then
                style [ ( "border", "1px solid" ) ]
            else
                style [ ( "border", "none" ) ]

        mouseOverStyle =
            on "mouseover" (Json.succeed <| MouseOver drop)

        mouseLeaveStyle =
            onMouseLeave MouseLeave
    in
        div [ mouseOverStyle, mouseLeaveStyle, borderStyle ] [ html ]


draggableItem : Item -> Drag -> DnDModel -> Html MouseMsg
draggableItem item drag dnd =
    let
        onMouseDown =
            onWithOptions "mousedown"
                { stopPropagation = True, preventDefault = True }
                (Json.map (Start item drag) Mouse.position)

        pointerEventStyle =
            case dnd.dragging of
                Just _ ->
                    style [ ( "pointer-events", "none" ) ]

                Nothing ->
                    style [ ( "pointer-events", "inherit" ) ]
    in
        div [ onMouseDown, pointerEventStyle ] [ Item.view item ]


{-| DnDModel tracks where the mouse starts and where it currently is to get the absolute
movement from when mouse down happens. This is the actual drag distance.
-}
getDisplacemnt : DnDModel -> Position
getDisplacemnt { draggedItem, position, dragging, drop } =
    case dragging of
        Nothing ->
            position

        Just { start, current } ->
            Position (position.x + current.x - start.x)
                (position.y + current.y - start.y)


viewDraggedItem : DnDModel -> Html MouseMsg
viewDraggedItem ({ draggedItem, position, dragging } as model) =
    let
        px =
            \x -> toString x ++ "px"

        newPos =
            getDisplacemnt model

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
        case draggedItem of
            Nothing ->
                div [] []

            Just item ->
                div [ positionStyle, pointerEventStyle ] [ Item.view item ]



---------------
-- Pack view --
---------------


viewPack : Maybe Item -> DnDModel -> Html MouseMsg
viewPack maybeItem dnd =
    let
        highlightStyle =
            style [ ( "background", "light blue" ) ]

        droppableHtml =
            \pack ->
                (div [ highlightStyle ] [ viewContainer (ItemPack pack) dnd ])
    in
        case maybeItem of
            Just (ItemPack pack) ->
                droppableDiv (DropPack pack) dnd (droppableHtml pack)

            _ ->
                div [] [ text "Pack is empty" ]


viewContainer : Item -> DnDModel -> Html MouseMsg
viewContainer containerItem dnd =
    let
        getItems =
            \pack -> Container.list (Item.getContainer pack)

        makeDraggable =
            \pack item -> draggableItem item (DragPack pack item) dnd
    in
        case (containerItem) of
            ItemPack pack ->
                div []
                    (pack
                        |> getItems
                        |> List.map (makeDraggable pack)
                    )

            _ ->
                div [] [ text "Item in pack equipment slot is not a pack, how did it get there?!" ]



--------------------
-- Equipment View --
--------------------


viewEquipmentSlots : Equipment -> DnDModel -> Html MouseMsg
viewEquipmentSlots equipment dnd =
    let
        getEquipment =
            \slot -> Equipment.get slot equipment

        drawItem =
            \item slot -> div [ class "three wide column equipmentSlot" ] [ draggableItem item (DragSlot slot item) dnd ]

        drawSlot =
            \slot ->
                case (getEquipment slot) of
                    Just item ->
                        drawItem item slot

                    Nothing ->
                        div [] []
    in
        div []
            [ drawSlot Equipment.Weapon
            , drawSlot Equipment.Freehand
            , drawSlot Equipment.Armour
            , drawSlot Equipment.Shield
            , drawSlot Equipment.Helmet
            , drawSlot Equipment.Bracers
            , drawSlot Equipment.Gauntlets
            , drawSlot Equipment.Belt
            , drawSlot Equipment.Purse
            , drawSlot Equipment.Pack
            , drawSlot Equipment.Neckwear
            , drawSlot Equipment.Overgarment
            , drawSlot Equipment.LeftRing
            , drawSlot Equipment.RightRing
            , drawSlot Equipment.Boots
            ]



------------------
-- Subscription --
------------------


subscriptions : Game.Data.Model -> List (Sub MouseMsg)
subscriptions ({ dnd } as model) =
    case dnd.draggedItem of
        Nothing ->
            [ Sub.none ]

        Just item ->
            [ Mouse.moves (At item), Mouse.ups End ]



{-
   viewShop : Screen -> Html Game.Data.Msg
   viewShop screen =
       case screen of
           BuildingScreen b ->
               div [ class "ui block header" ] [ text "shop" ]

           _ ->
               div [] []
-}
