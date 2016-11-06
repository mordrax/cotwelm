module Item.Item
    exposing
        ( AnyItem(..)
        , Item
        , Weapon
        , Armour
        , Shield
        , Helmet
        , Bracers
        , Gauntlets
        , Belt
        , Pack
        , Purse
        , Neckwear
        , Overgarment
        , Ring
        , Boots
        , new
        , newFoldableItem
        , view
        , viewSlot
          -- item functions
        , isCursed
        , priceOf
        , costOf
        , fromPurse
        , toPurse
          -- pack functions
        , addToPack
        , removeFromPack
        , packInfo
        , packContents
          -- comparisons
        , equals
        )

import Html exposing (..)
import Html.Attributes exposing (..)
import Container exposing (Container)


-- utils

import Utils.Mass as Mass exposing (..)
import Utils.IdGenerator as IdGenerator exposing (..)


-- sub items

import Item.Data exposing (..)
import Item.Weapon as Weapon exposing (Weapon)
import Item.Armour as Armour exposing (Armour)
import Item.Shield as Shield exposing (Shield)
import Item.Helmet as Helmet exposing (Helmet)
import Item.Bracers as Bracers exposing (Bracers)
import Item.Gauntlets as Gauntlets exposing (Gauntlets)
import Item.Belt as Belt exposing (Belt)
import Item.Pack as Pack exposing (Pack)
import Item.Purse as Purse exposing (Purse)


{-
   import Item.Purse exposing (..)
      import Item.Neckwear exposing (..)
      import Item.Overgarment exposing (..)
      import Item.Ring exposing (..)
      import Item.Boots exposing (..)
-}
-- for exporting


type alias Weapon =
    Weapon.Weapon


type alias Armour =
    Armour.Armour


type alias Shield =
    Shield.Shield


type alias Helmet =
    Helmet.Helmet


type alias Bracers =
    Bracers.Bracers


type alias Gauntlets =
    Gauntlets.Gauntlets


type alias Belt a =
    Belt.Belt a


type alias Pack a =
    Pack.Pack a


type alias Purse =
    Purse.Purse


type alias Model =
    { id : ID
    , name : String
    , prices : Prices
    , css : String
    , status : ItemStatus
    , isIdentified : IdentificationStatus
    , mass : Mass
    }


type alias Buy =
    Int


type alias Sell =
    Int


type Prices
    = Prices Buy Sell


type AnyItem
    = AnyItemWeapon (Item Weapon)
    | AnyItemArmour (Item Armour)
    | AnyItemShield (Item Shield)
    | AnyItemHelmet (Item Helmet)
    | AnyItemBracers (Item Bracers)
    | AnyItemGauntlets (Item Gauntlets)
    | AnyItemBelt (Item (Belt AnyItem))
    | AnyItemPack (Item (Pack AnyItem))
    | AnyItemPurse (Item Purse)
    | AnyItemNeckwear (Item Neckwear)
    | AnyItemOvergarment (Item Overgarment)
    | AnyItemRing (Item Ring)
    | AnyItemBoots (Item Boots)


type Item a
    = Item Model a


type Neckwear
    = NeckwearModelTag NeckwearType Model


type Overgarment
    = OvergarmentModelTag OvergarmentType Model


type Ring
    = RingModelTag RingType Model


type Boots
    = BootsModelTag BootsType Model



--------------------
-- Pack functions --
--------------------


addToPack : AnyItem -> Item (Pack AnyItem) -> ( Item (Pack AnyItem), Item.Data.Msg )
addToPack item (Item model packOfAnyItem) =
    let
        ( newPack, msg ) =
            Pack.add item packOfAnyItem
    in
        if equals item (AnyItemPack <| Item model packOfAnyItem) then
            ( Item model newPack, NestedItem )
        else
            case msg of
                Container.Ok ->
                    ( Item model newPack, Item.Data.Ok )

                Container.MassMsg massMsg ->
                    ( Item model packOfAnyItem, Item.Data.MassMsg massMsg )


removeFromPack : a -> Item (Pack a) -> Item (Pack a)
removeFromPack item (Item model pack) =
    Item model (Pack.remove item pack)


{-| Get the current mass and mass capacity for the given pack
-}
packInfo : Item (Pack a) -> ( Mass, Capacity )
packInfo (Item _ pack) =
    ( Pack.mass pack, Pack.capacity pack )


packContents : Item (Pack a) -> List a
packContents (Item _ pack) =
    Pack.list pack


{-| The price that shops are willing to sell an Item for, the buy field
-}
priceOf : AnyItem -> Int
priceOf item =
    let
        (Prices buy sell) =
            getModel item |> .prices
    in
        sell


{-| The price that shops are willing to buy an Item for, the sell field
-}
costOf : AnyItem -> Int
costOf item =
    let
        (Prices buy sell) =
            getModel item |> .prices
    in
        buy



----------------------------------------------------------------------
---------------------------- Base items ------------------------------
----------------------------------------------------------------------


getMass : AnyItem -> Mass
getMass =
    getModel >> .mass


isCursed : AnyItem -> Bool
isCursed =
    let
        isCursed status =
            status == Cursed
    in
        getModel >> .status >> isCursed


equals : AnyItem -> AnyItem -> Bool
equals anItemA anItemB =
    let
        modelA =
            getModel anItemA

        modelB =
            getModel anItemB
    in
        IdGenerator.equals modelA.id modelB.id


fromPurse : Purse.Purse -> Item Purse -> Item Purse
fromPurse purse (Item model _) =
    Item model purse


toPurse : Item Purse -> Purse.Purse
toPurse (Item model purse) =
    purse


getModel : AnyItem -> Model
getModel anItem =
    case anItem of
        AnyItemWeapon (Item model _) ->
            model

        AnyItemArmour (Item model _) ->
            model

        AnyItemShield (Item model _) ->
            model

        AnyItemHelmet (Item model _) ->
            model

        AnyItemBracers (Item model _) ->
            model

        AnyItemGauntlets (Item model _) ->
            model

        AnyItemBelt (Item model _) ->
            model

        AnyItemPack (Item model _) ->
            model

        AnyItemPurse (Item model _) ->
            model

        AnyItemNeckwear (Item model _) ->
            model

        AnyItemOvergarment (Item model _) ->
            model

        AnyItemRing (Item model _) ->
            model

        AnyItemBoots (Item model _) ->
            model


view : AnyItem -> Html msg
view item =
    viewSlot item ""


viewSlot : AnyItem -> String -> Html msg
viewSlot item extraContent =
    let
        model = getModel item
    in
    div [ class "card" ]
        [ div
            {- [ class "ui item"
               , style
                   [ ( "opacity", "1" )
                   , ( "cursor", "move" )
                   , ( "width", "32px" )
                   , ( "height", "64px" )
                   ]
               ]
            -}
            []
            [ div [ class "image" ]
                [ i [ class ("cotwItem " ++ model.css) ] []
                ]
            , div [ class "content" ]
                [ a [ class "header" ]
                    [ text model.name
                    ]
                , div [ class "meta" ]
                    [ span [ class "date" ] [ text "" ]
                    ]
                , div [ class "description", style [ ( "maxWidth", "7em" ) ] ]
                    [ text ""
                    ]
                ]
            , div [ class "extra content" ] [ text extraContent ]
            ]
        ]


newContainer : Capacity -> Container AnyItem
newContainer capacity =
    Container.init capacity getMass equals


newFoldableItem : ( key, ID -> Item ) -> ID -> ( key, Item )
newFoldableItem ( key, itemFactory ) id =
    ( key, itemFactory id )


new : ItemType -> ID -> AnyItem
new itemType id =
    newWithOptions itemType id Normal Identified


init : BaseItemData -> ItemStatus -> IdentificationStatus -> ID -> Model
init { name, weight, bulk, css, buy, sell } status idStatus id =
    { id = id
    , name = name
    , prices = Prices buy sell
    , css = css
    , status = Normal
    , isIdentified = Identified
    , mass = Mass bulk weight
    }


newWithOptions : ItemType -> ID -> ItemStatus -> IdentificationStatus -> AnyItem
newWithOptions itemType id status idStatus =
    let
        forge bid =
            init bid status idStatus id

        containerBuilder capacity =
            Container.init capacity getMass equals
    in
        case itemType of
            Weapon weaponType ->
                AnyItemWeapon <| Item (forge (Weapon.blueprint weaponType)) (Weapon.init weaponType)

            Armour armourType ->
                AnyItemArmour <| Item (forge (Armour.blueprint armourType)) (Armour.init armourType)

            Shield shieldType ->
                AnyItemShield <| Item (forge (Shield.blueprint shieldType)) (Shield.init shieldType)

            Helmet helmetType ->
                AnyItemHelmet <| Item (forge (Helmet.blueprint helmetType)) (Helmet.init helmetType)

            Bracers bracersType ->
                AnyItemBracers <| Item (forge (Bracers.blueprint bracersType)) (Bracers.init bracersType)

            Gauntlets gauntletsType ->
                AnyItemGauntlets <| Item (forge (Gauntlets.blueprint gauntletsType)) (Gauntlets.init gauntletsType)

            Belt beltType ->
                AnyItemBelt <| Item (forge (Belt.blueprint beltType)) (Belt.init beltType containerBuilder)

            Pack packType ->
                AnyItemPack <| Item (forge (Pack.blueprint packType)) (Pack.init packType containerBuilder)

            Purse ->
                AnyItemPurse <| Item (forge Purse.blueprint) Purse.init

            -- Neckwear
            --        Overgarment
            --        Ring
            --        Boots
            _ ->
                AnyItemWeapon <| Item (forge (Weapon.blueprint Dagger)) (Weapon.init Dagger)
