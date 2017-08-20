module Comms exposing (..)

import Message exposing (Message)


type alias Comms msg =
    { cmd : Cmd msg
    , messages : List Message
    }


init : Comms msg
init =
    { cmd = Cmd.none
    , messages = []
    }


attempt : Comms msg -> Cmd msg
attempt { cmd } =
    cmd


addMessage : Message -> Comms msg -> Comms msg
addMessage message comms =
    { comms | messages = message :: comms.messages }


add : Comms msg -> Comms msg -> Comms msg
add left right =
    { cmd = Cmd.batch [ left.cmd, right.cmd ]
    , messages = left.messages ++ right.messages
    }


addCmd : Cmd msg -> Comms msg -> Comms msg
addCmd cmd comms =
    { comms | cmd = Cmd.batch [ cmd, comms.cmd ] }


map : (a -> b) -> Comms a -> Comms b
map mapper comms =
    { comms | cmd = Cmd.map mapper comms.cmd }
