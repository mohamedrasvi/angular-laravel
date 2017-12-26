<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/


/** @var \Illuminate\Database\Eloquent\Factory $factory */
$factory->define(App\User::class, function (Faker\Generator $faker) {
    $faker = \Faker\Factory::create('pt_BR');  

    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'cpf' => $faker->cpf,
    	'date_of_birth' => $faker->date_of_birth,
    	'age' => $faker->age,
    ];
});
