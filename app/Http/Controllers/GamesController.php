<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GamesController extends Controller
{
    /**
    * Get the authenticated User's game result
    *
    * @return [json] games array
    */
    public function listGames(Request $request)
    {            
        return response()->json($request->user()->games);
    }

    /**
    * Add the result of a new game
    * @param  [string] result
    * @return [json] games array
    */
    public function addGame(Request $request)
    {   
        $request->validate([
            'result' => 'required|in:0,1,2'
        ]);

        $game = new \App\Models\Game;
        if($request->result == 0)   {
            $game->result = 'tied';

        } elseif($request->result == 1) {
            $game->result = 'won';

        } else {
            $game->result = 'lost';
        }

        $user = $request->user();
        $user->games()->save($game);

        return response()->json(['games' => $user->games]);
    }
}
