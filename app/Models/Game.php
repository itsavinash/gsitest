<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'result',
    ];

    /**
     * Get the user that owns the game.
     */
    public function post()
    {
        return $this->belongsTo('App\Models\User');
    }
}
