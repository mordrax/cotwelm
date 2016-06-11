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
    { dragSource = NoDrag
    , dropTarget = NoDrop
    , position = Position 0 0
    , dragging = Nothing
    }



----------
-- View --
----------


view : Game.Data.Model -> Html MouseMsg
view ({ equipment, dnd } as model) =
    let
        pack =
            Equipment.getSlot Equipment.Pack equipment
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
            \dragSource pos -> DnDModel dragSource dnd.dropTarget pos (Just (Dragging pos pos))

        atdnd =
            \dragSource pos -> DnDModel dragSource dnd.dropTarget dnd.position (Maybe.map (\{ start } -> (Dragging start pos)) dnd.dragging)
    in
        case msg of
            Start dragSource pos ->
                ( { model | dnd = startdnd dragSource pos }, Cmd.none )

            At dragSource pos ->
                ( { model | dnd = atdnd dragSource pos }, Cmd.none )

            -- on drag end, check if it's over a droppable container
            End _ ->
                handleMouseUp model

            MouseOver dropTarget ->
                ( { model | dnd = { dnd | dropTarget = dropTarget } }, Cmd.none )

            MouseLeave ->
                ( { model | dnd = { dnd | dropTarget = NoDrop } }, Cmd.none )



---------------------
-- Drag drop logic --
---------------------


{-| On mouse up, if there was something being dragged and a it's being dragged over a droppable container,
then call a function to handle the transaction, otherwise just clear the dndModel and return.
-}
handleMouseUp : Model -> ( Model, Cmd Game.Data.Msg )
handleMouseUp ({ dnd } as model) =
    let
        modelDnDReinit =
            { model | dnd = init }

        noChange =
            ( modelDnDReinit, Cmd.none )
    in
        case ( dnd.dragSource, dnd.dropTarget ) of
            ( NoDrag, _ ) ->
                noChange

            ( _, NoDrop ) ->
                noChange

            ( dragSource, dropTarget ) ->
                handleDragDrop dragSource dropTarget modelDnDReinit


{-| Top level of drag/drop transaction.
Algorithm:
- Resolve dragging the item away from the dragSource, return the modelWithDrag and the item being dragged.
- Resolve dropping the item into the dropTarget using the modelWithDrag. Return the modelWithDragDrop.
- If at any time, either resolutions returns a Result.err, return the initial model.

Drag
- Shop: Check player can afford item
- Equipment slot: Check item is not cursed
- Pack: Nothing

Drop
- Shop: Nothing
- Equipment slot: Check if an item is already equipped
- Pack: Check pack capacity
-}
handleDragDrop : DragSource -> DropTarget -> Model -> ( Model, Cmd Game.Data.Msg )
handleDragDrop dragSource dropTarget model =
    let
        dragResult =
            handleDrag dragSource model

        noChange =
            ( model, Cmd.none )

        handleDrop' =
            \item modelWithDrag ->
                case (handleDrop dropTarget item modelWithDrag) of
                    Ok modelWithDragDrop ->
                        ( modelWithDragDrop, Cmd.none )

                    Err _ ->
                        noChange
    in
        case dragResult of
            Ok ( modelWithDrag, item ) ->
                handleDrop' item modelWithDrag

            Err _ ->
                noChange


{-| handleDrag
- Shop:
  - Check player can afford item

- Equipment slot:
  - Check it's not cursed

- Pack:
  - Nothing
-}
handleDrag : DragSource -> Model -> Result Model ( Model, Item )
handleDrag dragSource model =
    case dragSource of
        NoDrag ->
            Result.Err model

        DragSlot item slot ->
            let
                unequipRes =
                    Equipment.unequip slot model.equipment
            in
                case unequipRes of
                    Result.Ok equipment' ->
                        Result.Ok ( { model | equipment = equipment' }, item )

                    Result.Err msg ->
                        Result.Ok ( model, item )

        DragPack item pack ->
            Result.Ok ( model, item )

        DragShop item ->
            Result.Ok ( model, item )


{-| handleDrop
- Shop:
  - Nothing

- Equipment slot:
  - Check if an item is already equipped

- Pack
  - Check pack capacity
-}
handleDrop : DropTarget -> Item -> Model -> Result Int Model
handleDrop dropTarget item model =
    case dropTarget of
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



---------------
-- Drag Drop --
---------------


droppableDiv : DropTarget -> DnDModel -> Html MouseMsg -> Html MouseMsg
droppableDiv dropTarget model html =
    let
        borderStyle =
            if model.dropTarget /= NoDrop then
                style [ ( "border", "1px solid" ) ]
            else
                style [ ( "border", "none" ) ]

        mouseOverStyle =
            on "mouseover" (Json.succeed <| MouseOver dropTarget)

        mouseLeaveStyle =
            onMouseLeave MouseLeave
    in
        div [ mouseOverStyle, mouseLeaveStyle, borderStyle ] [ html ]


draggableItem : Item -> DragSource -> DnDModel -> Html MouseMsg
draggableItem item dragSource dnd =
    let
        onMouseDown =
            onWithOptions "mousedown"
                { stopPropagation = True, preventDefault = True }
                (Json.map (Start dragSource) Mouse.position)

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
getDisplacemnt { dragSource, dropTarget, position, dragging } =
    case dragging of
        Nothing ->
            position

        Just { start, current } ->
            Position (position.x + current.x - start.x)
                (position.y + current.y - start.y)


viewDraggedItem : DnDModel -> Html MouseMsg
viewDraggedItem ({ dragSource, position, dragging } as model) =
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
        case dragSource of
            NoDrag ->
                div [] []

            DragSlot item _ ->
                div [ positionStyle, pointerEventStyle ] [ Item.view item ]

            DragPack item _ ->
                div [ positionStyle, pointerEventStyle ] [ Item.view item ]

            DragShop item ->
                Debug.crash "Dragshop not implemented"



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
            \pack item -> draggableItem item (DragPack item pack) dnd
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
            \slot -> Equipment.getSlot slot equipment

        drawItem =
            \item slot -> div [ class "three wide column equipmentSlot" ] [ draggableItem item (DragSlot item slot) dnd ]

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
    case dnd.dragSource of
        NoDrag ->
            [ Sub.none ]

        dragSource ->
            [ Mouse.moves (At dragSource), Mouse.ups End ]



{-
   viewShop : Screen -> Html Game.Data.Msg
   viewShop screen =
       case screen of
           BuildingScreen b ->
               div [ class "ui block header" ] [ text "shop" ]

           _ ->
               div [] []
-}
