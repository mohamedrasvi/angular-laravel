<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class User extends Model
{
	use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'cpf','email', 'date_of_birth','age',
    	
    ];
    
    protected $dates = ['deleted_at'];
    
    public function setcpfAttribute($cpf)
    {
    	$this->attributes['cpf'] = str_replace(array('.', '-'),'',$cpf);
    	 
    }

}
