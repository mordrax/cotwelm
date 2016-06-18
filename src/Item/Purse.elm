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


type alias Model =
    { copper : Coins
    , silver : Coins
    , gold : Coins
    , platinum : Coins
    }


type alias Coins =
    Int


type Purse
    = PurseModel Model


type CoinType
    = Copper
    | Silver
    | Gold
    | Platinum


type Msg
    = Ok
    | NotEnoughCoins


new : Purse
new =
    PurseModel <| Model 100 10 1 0


getCoins : CoinType -> Purse -> Coins
getCoins coinType (PurseModel model) =
    case coinType of
        Copper ->
            model.copper

        Silver ->
            model.silver

        Gold ->
            model.gold

        Platinum ->
            model.platinum


add : Coins -> Purse -> Purse
add copper (PurseModel model) =
    PurseModel model


merge : Purse -> Purse -> Purse
merge (PurseModel p1) (PurseModel p2) =
    PurseModel (purses (+) p1 p2)


take : Purse -> Purse -> Purse
take (PurseModel p1) (PurseModel p2) =
    PurseModel (purses (-) p1 p2)


purses : (Int -> Int -> Int) -> Model -> Model -> Model
purses op p1 p2 =
    Model (p1.copper `op` p2.copper) (p1.silver `op` p2.silver) (p1.gold `op` p2.gold) (p1.platinum `op` p2.platinum)


remove : Coins -> Purse -> ( Purse, Msg )
remove copper (PurseModel model) =
    ( PurseModel model, Ok )


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
        PurseModel <| Model c s g p
