module Item.Purse
    exposing
        ( Purse
        , CoinType(..)
        , new
        , add
        , merge
        , remove
        , getCoins
        )


type CoinType
    = Copper
    | Silver
    | Gold
    | Platinum


type alias Model =
    { copper : Coins
    , silver : Coins
    , gold : Coins
    , platinum : Coins
    }


type alias Coins =
    Int


type Purse
    = PM Model


type Msg
    = Ok
    | NotEnoughCoins


new : Purse
new =
    PM <| Model 100 10 1 0


getCoins : Purse -> ( Coins, Coins, Coins, Coins )
getCoins (PM model) =
    ( model.copper
    , model.silver
    , model.gold
    , model.platinum
    )


add : Coins -> Purse -> Purse
add copper (PM model) =
    PM model


merge : Purse -> Purse -> Purse
merge (PM p1) (PM p2) =
    PM (purses (+) p1 p2)


{-| Perform an operation (+, -, etc...) on each denomination of two purses
-}
purses : (Coins -> Coins -> Coins) -> Model -> Model -> Model
purses op p1 p2 =
    Model (p1.copper `op` p2.copper) (p1.silver `op` p2.silver) (p1.gold `op` p2.gold) (p1.platinum `op` p2.platinum)


remove : Coins -> Purse -> Result String Purse
remove copper (PM model) =
    Result.Ok (PM model)


toPurseOfLeastCoins : Coins -> Purse
toPurseOfLeastCoins coins =
    let
        p =
            coins // 1000000

        g =
            coins // 10000 - p * 100

        s =
            coins // 100 - g * 100 - p * 10000

        c =
            coins - s * 100 - g * 10000 - p * 1000000
    in
        PM <| Model c s g p
