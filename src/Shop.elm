module Shop exposing (Shop, new)


type Shop
    = ShopModel Model


type alias Model =
    {}


new : Shop
new =
    ShopModel {}
