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
import Mass exposing (..)


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
        maybePack =
            Equipment.getSlot Equipment.Pack equipment

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
            columnWidth "six" [ viewEquipment equipment dnd ]

        shopPackColumn =
            columnWidth "ten" [ shopHtml, packHtml ]

        shopHtml =
            header "Shop"

        packHtml =
            div [] [ header ("Pack: (" ++ (viewPackInfo maybePack) ++ ")"), viewPack maybePack model ]
    in
        div []
            [ heading "Inventory screen"
            , div [ class "ui two column grid" ]
                [ equipmentColumn
                , shopPackColumn
                ]
            , viewDraggedItem dnd
            ]


viewPackInfo : Maybe Item -> String
viewPackInfo maybeItem =
    case maybeItem of
        Just (ItemPack pack) ->
            let
                ( curMass, capMass ) =
                    Item.packInfo pack

                ( curBulk, curWeight ) =
                    Mass.info curMass

                ( capBulk, capWeight ) =
                    Mass.info capMass

                print =
                    \name a b -> name ++ ": " ++ (toString a) ++ " / " ++ (toString b)
            in
                (print "Bulk" curBulk capBulk) ++ ", " ++ (print "Weight" curWeight capWeight)

        _ ->
            ""



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
                    Result.Ok modelWithDragDrop ->
                        ( modelWithDragDrop, Cmd.none )

                    Err _ ->
                        noChange
    in
        case dragResult of
            Result.Ok ( modelWithDrag, item ) ->
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

        DragPack idItem pack ->
            let
                modelItemRemoved =
                    { model | equipment = Equipment.removeFromPack idItem model.equipment }
            in
                Debug.log "TODO: Remove item from the pack.container and return just the item"
                    Result.Ok
                    ( modelItemRemoved, (Container.getItem idItem) )

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
                ( equipment', massComparison ) =
                    Equipment.putInPack item model.equipment
            in
                case massComparison of
                    Mass.Ok ->
                        Result.Ok { model | equipment = equipment' }

                    _ ->
                        Debug.log "dropping into pack failed" Result.Err 1

        DropEquipment slot ->
            Result.Ok { model | equipment = Equipment.equip slot item model.equipment }

        NoDrop ->
            Debug.log "ERROR: Trying to drop but the DropTarget is NoDrop" Result.Ok model



---------------
-- Drag Drop --
---------------


droppable : DropTarget -> DnDModel -> Html MouseMsg -> Html MouseMsg
droppable dropTarget model html =
    let
        borderStyle =
            if model.dropTarget == dropTarget then
                style [ ( "border", "1px solid" ) ]
            else
                style [ ( "border", "none" ) ]

        mouseOverStyle =
            on "mouseover" (Json.succeed <| MouseOver dropTarget)

        mouseLeaveStyle =
            onMouseLeave MouseLeave
    in
        div [ mouseOverStyle, mouseLeaveStyle, borderStyle ] [ html ]


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

        itemHtml =
            \idItem ->
                idItem |> Container.getItem |> Item.view
    in
        case dragSource of
            NoDrag ->
                div [] []

            DragSlot item _ ->
                div [ positionStyle, pointerEventStyle ] [ Item.view item ]

            DragPack idItem _ ->
                div [ positionStyle, pointerEventStyle ] [ itemHtml idItem ]

            DragShop item ->
                Debug.crash "Dragshop not implemented"



---------------
-- Pack view --
---------------


viewPack : Maybe Item -> Game.Data.Model -> Html MouseMsg
viewPack maybeItem ({ dnd } as model) =
    let
        highlightStyle =
            style [ ( "background", "light blue" ) ]

        droppableHtml =
            \pack ->
                (div [ highlightStyle ] [ viewContainer (ItemPack pack) model ])
    in
        case maybeItem of
            Just (ItemPack pack) ->
                droppable (DropPack pack) dnd (droppableHtml pack)

            _ ->
                div [] [ text "Pack is empty" ]


viewContainer : Item -> Game.Data.Model -> Html MouseMsg
viewContainer containerItem ({ equipment, dnd } as model) =
    let
        idItems =
            Equipment.getPackContent equipment

        itemHtml =
            \idItem ->
                idItem
                    |> Container.getItem
                    |> Item.view

        makeDraggable =
            \pack idItem -> draggableItem (itemHtml idItem) (DragPack idItem pack) dnd
    in
        case (containerItem) of
            ItemPack pack ->
                div []
                    (List.map (makeDraggable pack) idItems)

            _ ->
                div [] [ text "Item in pack equipment slot is not a pack, how did it get there?!" ]


draggableItem : Html MouseMsg -> DragSource -> DnDModel -> Html MouseMsg
draggableItem html dragSource dnd =
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
        div [ onMouseDown, pointerEventStyle ] [ html ]



--------------------
-- Equipment View --
--------------------


viewEquipment : Equipment -> DnDModel -> Html MouseMsg
viewEquipment equipment dnd =
    let
        getEquipment =
            \slot -> Equipment.getSlot slot equipment

        drawItem =
            \item slot ->
                draggableItem (Item.view item) (DragSlot item slot) dnd

        drawSlot =
            \slot ->
                let
                    slotName =
                        toString slot
                in
                    case (getEquipment slot) of
                        Just item ->
                            div [ class "three wide column equipmentSlot" ]
                                [ drawItem item slot ]

                        Nothing ->
                            droppable (DropEquipment slot) dnd (div [] [ text slotName ])
    in
        div [ class "ui grid" ]
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
