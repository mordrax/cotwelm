module Pages.Inventory
    exposing
        ( Inventory
        , Msg
        , Draggable
        , Droppable
        , keyboardMsg
        , init
        , view
        , update
        , subscription
        )

{-|
The inventory module predominantlys acts as the user interface for the 'i'nventory and shop screen.
It handles equipping, buy/sell, identification, moving items into packs and other general inventory related logic.

The module subscribes to mouse events for item interactions and is generally high level because it needs
to know about hero equipment, items, containers etc...
-}

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.App exposing (..)


-- item

import Item.Item as Item exposing (..)
import Item.TypeDef exposing (..)


-- game

import Equipment exposing (..)
import Utils.Mass as Mass exposing (..)
import Utils.DragDrop as DragDrop exposing (DragDrop)
import Item.Purse as Purse exposing (..)
import Shops exposing (Shops, Shop)
import Game.Keyboard as Keyboard
import Task


type Inventory
    = A Model


type Merchant
    = Shop Shop
    | Ground


type alias Model =
    { dnd : DragDrop Draggable Droppable
    , merchant : Merchant
    , equipment : Equipment
    }


type Draggable
    = DragSlot Item EquipmentSlot
    | DragPack Item (Item.Pack Item)
    | DragMerchant Item Merchant


type Droppable
    = DropPack (Item.Pack Item)
    | DropEquipment EquipmentSlot
    | DropMerchant Merchant


type Msg source target
    = DnDMsg (DragDrop.Msg source target)
    | Keyboard Keyboard.Msg


init : Maybe Shop -> Equipment -> Inventory
init maybeShop equipment =
    let
        merchant =
            case maybeShop of
                Just shop ->
                    Shop shop

                Nothing ->
                    Ground
    in
        A
            { dnd = DragDrop.init
            , merchant = merchant
            , equipment = equipment
            }



------------
-- Update --
------------


update : Msg Draggable Droppable -> Inventory -> ( Inventory, Maybe ( Equipment, Maybe Shop ) )
update msg (A ({ dnd } as model)) =
    case msg of
        DnDMsg dragDropMsg ->
            let
                ( dnd_, end ) =
                    DragDrop.update dragDropMsg model.dnd

                modelNewDnD =
                    { model | dnd = DragDrop.init }
            in
                case end of
                    Nothing ->
                        ( A { model | dnd = dnd_ }, Nothing )

                    Just ( Nothing, _ ) ->
                        ( A modelNewDnD, Nothing )

                    Just ( _, Nothing ) ->
                        ( A modelNewDnD, Nothing )

                    {- On mouse up, if there was something being dragged and a it's being dragged over a droppable container,
                       then call a function to handle the transaction, otherwise just clear the dndModel and return.
                    -}
                    Just ( Just drag, Just drop ) ->
                        ( A <| handleDragDrop drag drop modelNewDnD, Nothing )

        Keyboard Keyboard.Esc ->
            let
                _ = Debug.log "Inventory.update.keyboard.esc" 1
            in
            case model.merchant of
                Shop shop ->
                    ( A model, Just ( model.equipment, Just shop ) )
                Ground ->
                    ( A model, Just ( model.equipment, Nothing ) )


        Keyboard msg ->
            let
                _ = Debug.log "Inventory.update.keyboard.msg" msg
            in
            (A model, Nothing)

keyboardMsg : Keyboard.Msg -> Cmd (Msg s t)
keyboardMsg msg =
    let
        _ = Debug.log "Inveotry.keyboardMsg" msg
    in
    Task.perform (\_ -> Debug.crash "unfallable failed" 1) Keyboard (Task.succeed msg)



---------------------
-- Drag drop logic --
---------------------


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
handleDragDrop : Draggable -> Droppable -> Model -> Model
handleDragDrop dragSource dropTarget model =
    let
        dragResult =
            handleDrag dragSource model

        noChange =
            model

        handleDrop' item modelWithDrag =
            case (handleDrop dropTarget item modelWithDrag) of
                Result.Ok modelWithDragDrop ->
                    modelWithDragDrop

                Err msg ->
                    let
                        _ =
                            Debug.log "Drop failed: " msg
                    in
                        noChange
    in
        case dragResult of
            Result.Ok ( modelWithDrag, item ) ->
                handleDrop' item modelWithDrag

            Err msg ->
                let
                    _ =
                        Debug.log "Drag failed: " msg
                in
                    noChange


{-| handleDrag
- Shop:
  - Check player can afford item

- Equipment slot:
  - Check it's not cursed

- Pack:
  - Nothing
-}
handleDrag : Draggable -> Model -> Result String ( Model, Item )
handleDrag draggable model =
    case draggable of
        DragSlot item slot ->
            let
                unequipRes =
                    Equipment.unequip slot model.equipment
            in
                case unequipRes of
                    Result.Ok equipment ->
                        Result.Ok ( { model | equipment = equipment }, item )

                    Result.Err msg ->
                        Result.Err msg

        DragPack item pack ->
            let
                modelItemRemoved =
                    { model | equipment = Equipment.removeFromPack item model.equipment }

                _ =
                    Debug.log "TODO: Remove item from the pack.container and return just the item" 1
            in
                Result.Ok ( modelItemRemoved, item )

        DragMerchant item shop ->
            transactWithMerchant item model


transactWithMerchant : Item -> Model -> Result String ( Model, Item )
transactWithMerchant item ({ merchant, equipment } as model) =
    let
        maybePurse =
            Equipment.get Equipment.Purse equipment `Maybe.andThen` toPurse

        buyFrom shop =
            case maybePurse of
                Just purse ->
                    Shops.sell item purse shop

                Nothing ->
                    Result.Err "No purse to buy anything with!"

        updateModelFromPurchase ( shop, purse ) =
            Result.Ok
                ( { model
                    | merchant = Shop shop
                    , equipment = Equipment.updatePurseContents purse equipment
                  }
                , item
                )

        pickup =
            Result.Err "ERROR: Picking stuff up is not implemented yet"
    in
        case merchant of
            Shop shop ->
                buyFrom shop
                    `Result.andThen` updateModelFromPurchase

            Ground ->
                pickup


{-| handleDrop
- Shop:
  - Nothing

- Equipment slot:
  - Check if an item is already equipped

- Pack
  - Check pack capacity
-}
handleDrop : Droppable -> Item -> Model -> Result String Model
handleDrop droppable item model =
    case droppable of
        DropPack pack ->
            let
                ( equipment', equipMsg ) =
                    Equipment.putInPack item model.equipment

                success =
                    Result.Ok { model | equipment = equipment' }
            in
                case equipMsg of
                    Equipment.Ok ->
                        success

                    Equipment.NoPackEquipped ->
                        Result.Err "Can't add to the pack. No packed equipped!"

                    Equipment.ItemMsg (Item.TypeDef.Ok) ->
                        success

                    Equipment.ItemMsg msg ->
                        Result.Err ("Dropping into pack with unhandled item msg" ++ (toString msg))

                    msg ->
                        Result.Err ("Dropping into pack failed with unhanded msg: " ++ (toString msg))

        DropEquipment slot ->
            case Equipment.equip ( slot, item ) model.equipment of
                Result.Ok equipment' ->
                    Result.Ok { model | equipment = equipment' }

                Result.Err err ->
                    Result.Err (toString err)

        DropMerchant merchant ->
            let
                getPurse =
                    model.equipment
                        |> Equipment.get Equipment.Purse
                        |> (\x -> Maybe.andThen x toPurse)
                        |> Result.fromMaybe "No purse to hold coins!"

                sellTo shop purse =
                    let
                        ( shopAfterBought, purseAfterPaid ) =
                            Shops.buy item purse shop
                    in
                        Result.Ok
                            { model
                                | merchant = Shop shopAfterBought
                                , equipment = Equipment.updatePurseContents purseAfterPaid model.equipment
                            }
            in
                case merchant of
                    Shop shop ->
                        getPurse
                            `Result.andThen` sellTo shop

                    Ground ->
                        Result.Err "ERROR: Not implemented dropping stuff on the ground yet"



----------
-- View --
----------


view : Inventory -> Html (Msg Draggable Droppable)
view (A ({ equipment, dnd } as model)) =
    let
        header title =
            div [ class "ui block header" ] [ text title ]

        heading title =
            span [ class "ui text container segment" ] [ text title ]

        columnWidth width children =
            div [ class (width ++ " wide column") ] children

        equipmentColumn =
            columnWidth "six" [ viewEquipment equipment dnd ]
    in
        div []
            [ heading "Inventory screen"
            , div [ class "ui two column grid" ]
                [ Html.App.map DnDMsg equipmentColumn
                , viewShopPackPurse model
                ]
            , Html.App.map DnDMsg (DragDrop.view dnd)
            ]


viewShopPackPurse : Model -> Html (Msg Draggable Droppable)
viewShopPackPurse ({ equipment, merchant, dnd } as model) =
    let
        header title =
            div [ class "ui block header" ] [ text title ]

        columnWidth width children =
            div [ class (width ++ " wide column") ] children

        groundHtml =
            div [] [ header "Ground", viewGround model ]

        shopHtml shop =
            div []
                [ header "Shop"
                , viewShop shop dnd
                ]

        maybePack =
            case Equipment.get Equipment.Pack equipment of
                Just (ItemPack pack) ->
                    Just pack

                _ ->
                    Nothing

        shopGroundHtml =
            case merchant of
                Shop shop ->
                    shopHtml shop

                Ground ->
                    groundHtml

        packHtml =
            div []
                [ header ("Pack: (" ++ (viewPackInfo maybePack) ++ ")")
                , viewPack maybePack model
                ]

        purseHtml =
            div []
                [ header "Purse"
                , viewPurse model
                ]
    in
        Html.App.map DnDMsg
            (columnWidth "ten"
                [ shopGroundHtml
                , packHtml
                , purseHtml
                ]
            )


viewGround : Model -> Html (DragDrop.Msg Draggable Droppable)
viewGround model =
    div [] []


viewPackInfo : Maybe (Pack Item) -> String
viewPackInfo maybeItem =
    case maybeItem of
        Just pack ->
            let
                ( curMass, capMass ) =
                    Item.packInfo pack

                ( curBulk, curWeight ) =
                    Mass.info curMass

                ( capBulk, capWeight ) =
                    Mass.info capMass

                print name a b =
                    name ++ ": " ++ (toString a) ++ " / " ++ (toString b)
            in
                (print "Bulk" curBulk capBulk) ++ ", " ++ (print "Weight" curWeight capWeight)

        _ ->
            ""



---------------
-- Pack view --
---------------


viewPack : Maybe (Pack Item) -> Model -> Html (DragDrop.Msg Draggable Droppable)
viewPack maybePack ({ dnd } as model) =
    let
        packStyle =
            style [ ( "background", "lightblue" ), ( "min-height", "100px" ) ]

        droppableHtml pack =
            (div [ packStyle ] [ viewContainer (ItemPack pack) model ])
    in
        case maybePack of
            Just pack ->
                DragDrop.droppable (DropPack pack) dnd (droppableHtml pack)

            _ ->
                div [] [ text "You have no pack! Equip a pack to use this space." ]


viewShop : Shop -> DragDrop Draggable Droppable -> Html (DragDrop.Msg Draggable Droppable)
viewShop shop dnd =
    let
        wares =
            Shops.wares shop

        makeDraggable : Shop -> Item -> Html (DragDrop.Msg Draggable a)
        makeDraggable shop item =
            DragDrop.draggable (Item.view item) (DragMerchant item (Shop shop)) dnd

        droppableDiv =
            div [ class "ui cards" ] (List.map (makeDraggable shop) wares)

        droppableShop =
            DragDrop.droppable (DropMerchant (Shop shop)) dnd droppableDiv

        --DragDrop.droppable (DropPack pack) dnd (droppableHtml pack)
    in
        droppableShop


viewContainer : Item -> Model -> Html (DragDrop.Msg Draggable Droppable)
viewContainer containerItem ({ equipment, dnd } as model) =
    let
        items =
            Equipment.getPackContent equipment

        makeDraggable pack item =
            DragDrop.draggable (Item.view item) (DragPack item pack) dnd
    in
        case (containerItem) of
            ItemPack pack ->
                div [ class "ui cards" ]
                    (List.map (makeDraggable pack) items)

            _ ->
                div [] [ text "Item in pack equipment slot is not a pack, how did it get there?!" ]



--------------------
-- Equipment View --
--------------------


viewEquipment : Equipment -> DragDrop Draggable Droppable -> Html (DragDrop.Msg Draggable Droppable)
viewEquipment equipment dnd =
    let
        getEquipment slot =
            Equipment.get slot equipment

        drawItem item slot =
            DragDrop.draggable (Item.viewSlot item ("Slot: " ++ (toString slot))) (DragSlot item slot) dnd

        drawSlot slot =
            let
                slotName =
                    "Slot: [" ++ (toString slot) ++ "]"
            in
                case (getEquipment slot) of
                    Just item ->
                        div [ class "three wide column equipmentSlot" ]
                            [ drawItem item slot ]

                    Nothing ->
                        div [ class "three wide column equipmentSlot" ]
                            [ DragDrop.droppable (DropEquipment slot) dnd (div [] [ text slotName ])
                            ]
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



----------------
-- Purse View --
----------------


viewPurse : Model -> Html (DragDrop.Msg Draggable Droppable)
viewPurse ({ equipment } as model) =
    let
        maybePurseContents =
            (Equipment.get Equipment.Purse equipment)
                `Maybe.andThen` Item.toPurse
                `Maybe.andThen` maybeCoins

        maybeCoins coins =
            Just (Purse.getCoins coins)
    in
        case maybePurseContents of
            Just ( c, s, g, p ) ->
                div [ class "ui grid" ]
                    [ div [ class "CoinsCopper cotwItem" ] [ text (toString c) ]
                    , div [ class "CoinsSilver cotwItem" ] [ text (toString s) ]
                    , div [ class "CoinsGold cotwItem" ] [ text (toString g) ]
                    , div [ class "CoinsPlatinum cotwItem" ] [ text (toString p) ]
                    ]

            _ ->
                div [] []


subscription : Inventory -> Sub (Msg Draggable Droppable)
subscription (A { dnd }) =
    Sub.map DnDMsg (DragDrop.subscription dnd)
