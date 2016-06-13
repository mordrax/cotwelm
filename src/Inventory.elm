module Inventory
    exposing
        ( view
        , update
        )

{-|
The inventory module predominatelys acts as the user interface for the 'i'nventory and shop screen.
It handles equiping, buy/sell, identification, moving items into packs and other general inventory related logic.

The module subscribes to mouse events for item interactions and is generally high level because it needs
to know about hero equipment, items, containers etc...
-}

import Html exposing (..)
import Html.Attributes exposing (..)
import GameData.Item as Item exposing (..)
import Game.Data exposing (..)
import Container exposing (..)
import Equipment exposing (..)
import Mass exposing (..)
import DragDrop exposing (..)


type Msg
    = InventoryMsg
    | DnDMsg



----------
-- View --
----------


view : Game.Data.Model -> Html Msg
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
            , DragDrop.view dnd
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


update : Msg -> Model -> Model
update msg model =
    { model | dnd = DragDrop.update msg model.dnd }



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
        noChange



{- case ( dnd.dragSource, dnd.dropTarget ) of
   ( NoDrag, _ ) ->
       noChange

   ( _, NoDrop ) ->
       noChange

   ( dragSource, dropTarget ) ->
       handleDragDrop dragSource dropTarget modelDnDReinit
-}


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
handleDragDrop : Game.Data.Drag -> Game.Data.Drop -> Model -> ( Model, Cmd Game.Data.Msg )
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
handleDrag : Game.Data.Drag -> Model -> Result Model ( Model, Item )
handleDrag drag model =
    case drag of
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
handleDrop : Game.Data.Drop -> Item -> Model -> Result Int Model
handleDrop drop item model =
    case drop of
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



---------------
-- Pack view --
---------------


viewPack : Maybe Item -> Game.Data.Model -> Html Msg
viewPack maybeItem ({ dnd } as model) =
    let
        highlightStyle =
            style [ ( "background", "lightblue" ) ]

        droppableHtml =
            \pack ->
                (div [ highlightStyle ] [ viewContainer (ItemPack pack) model ])
    in
        case maybeItem of
            Just (ItemPack pack) ->
                DragDrop.droppable (DropPack pack) dnd (droppableHtml pack)

            _ ->
                div [] [ text "Pack is empty" ]


viewContainer : Item -> Game.Data.Model -> Html Msg
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
            \pack idItem -> DragDrop.draggable (itemHtml idItem) (DragPack idItem pack) dnd
    in
        case (containerItem) of
            ItemPack pack ->
                div []
                    (List.map (makeDraggable pack) idItems)

            _ ->
                div [] [ text "Item in pack equipment slot is not a pack, how did it get there?!" ]



--------------------
-- Equipment View --
--------------------


viewEquipment : Equipment -> DragDrop Game.Data.Drag Game.Data.Drop -> Html (DragDropMsg Game.Data.Drag Game.Data.Drop)
viewEquipment equipment dnd =
    let
        getEquipment =
            \slot -> Equipment.getSlot slot equipment

        drawItem =
            \item slot ->
                DragDrop.draggable (Item.view item) (DragSlot item slot) dnd

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
                            DragDrop.droppable (DropEquipment slot) dnd (div [] [ text slotName ])
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
