module Job exposing (..)

import Task


type alias Job msg =
    { cmds : List (Cmd msg)
    , messages : List String
    }


init : Job msg
init =
    { cmds = []
    , messages = []
    }


attempt : Job msg -> Cmd msg
attempt { cmds } =
    Cmd.batch cmds


{-| merge left with right. see unionWith
-}
add : Job msg -> Job msg -> Job msg
add left right =
    { cmds = right.cmds ++ left.cmds
    , messages = right.messages ++ left.messages
    }


addMsg : msg -> Job msg -> Job msg
addMsg msg job =
    { job | cmds = toCmd msg :: job.cmds }


addCmd : Cmd msg -> Job msg -> Job msg
addCmd cmd job =
    { job | cmds = cmd :: job.cmds }


addCmds : List (Cmd msg) -> Job msg -> Job msg
addCmds cmds job =
    { job | cmds = Cmd.batch cmds :: job.cmds }


map : (a -> b) -> Job a -> Job b
map mapper job =
    let
        newCmds =
            List.map (Cmd.map mapper) job.cmds
    in
    { job | cmds = newCmds }


toCmd : msg -> Cmd msg
toCmd msg =
    Task.perform identity (Task.succeed msg)
