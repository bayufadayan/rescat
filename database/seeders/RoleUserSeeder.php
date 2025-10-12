<?php

namespace Database\Seeders;

use App\Models\User;

use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Roles (guard 'web')
        $adminRole = Role::findOrCreate('admin', 'web');
        $userRole  = Role::findOrCreate('user',  'web');

        // Admin
        $admin = User::firstOrCreate(
            ['email' => 'bayu@rescat.life'],
            [
                'name'              => 'Bayu (Admin)',
                'password'          => Hash::make('Password123!'),
                'email_verified_at' => now(),
            ]
        );
        $admin->syncRoles([$adminRole->name]);

        // User
        $user = User::firstOrCreate(
            ['email' => 'sieldrigatan@gmail.com'],
            [
                'name'              => 'Sield (User)',
                'password'          => Hash::make('Password123!'),
                'email_verified_at' => now(),
            ]
        );
        $user->syncRoles([$userRole->name]);
    }
}
