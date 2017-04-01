<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Validator;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();
        return response($users, 200);
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:60',
            'email' => 'required|email|unique:users',
            'telefone' => 'required|unique:users',
        ]);

        if ($validator->fails()) {
            return response([
                'message'   => 'Validation Failed',
                'errors'    => $validator->errors()->all()
                ]);
        }

        $user = new User();
        $user->fill($request->all());
        $user->save();

        return response($user, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::find($id);

        if(!$user){
            return response(array('message' => 'Record not found.'), 404);
        }

        return response($user, 200);
    }



    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:60',
            'email' => 'required|email',
            'telefone' => 'required',
        ]);

        if ($validator->fails()) {
            return response([
                'message'   => 'Validation Failed',
                'errors'    => $validator->errors()->all()
                ]);
        }

        $user = User::find($id);

        if(!$user){
            return response(array('message' => 'Record not found.'), 404);
        }

        $user->fill($request->all());
        $user->save();

        return response($user, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find($id);

        if(!$user){
            return response(array('message' => 'Record not found.'), 404);
        }

        $user->delete();

        return response(array('message' => 'Record was deleted.'), 200);
    }
}
