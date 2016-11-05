module Item.Purse
    exposing
        ( Purse(..)
        , init
        , blueprint
        , add
        , merge
        , remove
        , getCoins
        )

import Item.Data exposing (..)


type alias Model =
    { copper : Coins
    , silver : Coins
    , gold : Coins
    , platinum : Coins
    }


type alias Coins =
    Int


type Purse
    = Purse Model


type Msg
    = Ok
    | NotEnoughCoins


blueprint : BaseItemData
blueprint =
    BaseItemData "Purse" 0 0 "Purse" 0 0


init : Purse
init =
    Purse
        { copper = 100
        , silver = 10
        , gold = 1
        , platinum = 1
        }



--        , baseItem = (Model id "Purse" 0 0 "Purse" status idStatus <| Mass 0 0)


getCoins : Purse -> ( Int, Int, Int, Int )
getCoins (Purse model) =
    ( model.copper
    , model.silver
    , model.gold
    , model.platinum
    )


add : Int -> Purse -> Purse
add coppers (Purse ({ copper, silver, gold, platinum } as model)) =
    let
        ( c, s, g, p ) =
            toLeastCoins coppers
    in
        Purse { model | copper = copper + c, silver = silver + s, gold = gold + g, platinum = platinum + p }


merge : Purse -> Purse -> Purse
merge (Purse p1) (Purse p2) =
    Purse (purses (+) p1 p2)


{-| Perform an operation (+, -, etc...) on each denomination of two purses
-}
purses : (Int -> Int -> Int) -> Model -> Model -> Model
purses op p1 p2 =
    Model (p1.copper `op` p2.copper)
        (p1.silver `op` p2.silver)
        (p1.gold `op` p2.gold)
        (p1.platinum `op` p2.platinum)


remove : Int -> Purse -> Result String Purse
remove copperToRemove (Purse ({ copper, silver, gold, platinum } as model)) =
    let
        totalSilvers =
            copper + silver * 100

        totalGold =
            totalSilvers + gold * 10000

        totalPlatinum =
            totalGold + platinum * 1000000
    in
        if (copperToRemove <= copper) then
            Result.Ok (Purse { model | copper = copper - copperToRemove })
        else if (copperToRemove <= totalSilvers) then
            let
                ( copper', silver' ) =
                    toLeastSilvers (totalSilvers - copperToRemove)
            in
                Result.Ok (Purse { model | copper = copper', silver = silver' })
        else if (copperToRemove <= totalGold) then
            let
                ( copper', silver', gold' ) =
                    toLeastGold (totalGold - copperToRemove)
            in
                Result.Ok (Purse { model | copper = copper', silver = silver', gold = gold' })
        else if (copperToRemove <= totalPlatinum) then
            let
                ( copper', silver', gold', platinum' ) =
                    toLeastCoins (totalPlatinum - copperToRemove)
            in
                Result.Ok (Purse { model | copper = copper', silver = silver', gold = gold', platinum = platinum' })
        else
            Result.Err "Not enough coins to remove!"


toLeastCoins : Int -> ( Int, Int, Int, Int )
toLeastCoins coins =
    let
        ( copper, silver, gold ) =
            toLeastGold coins
    in
        ( copper, silver, gold % 100, gold // 100 )


toLeastGold : Int -> ( Int, Int, Int )
toLeastGold coins =
    let
        ( copper, silver ) =
            toLeastSilvers coins
    in
        ( copper, silver % 100, silver // 100 )


toLeastSilvers : Int -> ( Int, Int )
toLeastSilvers coins =
    ( coins % 100, coins // 100 )
