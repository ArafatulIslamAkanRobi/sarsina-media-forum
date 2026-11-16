<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([RolesAndPermissionsSeeder::class, SiteContentSeeder::class]);

        // First Super Admin. Credentials come from .env; a random password is
        // generated (and printed once) if none is set. Change it after login.
        $email = env('SUPER_ADMIN_EMAIL', 'admin@example.com');
        if (! User::where('email', $email)->exists()) {
            $password = env('SUPER_ADMIN_PASSWORD') ?: Str::password(16);
            $user = User::create([
                'name' => env('SUPER_ADMIN_NAME', 'Super Admin'),
                'email' => $email,
                'password' => $password,
                'is_approved' => true,
                'is_active' => true,
            ]);
            $user->forceFill(['approved_at' => now()])->save();
            $user->assignRole('super_admin');
            if (! env('SUPER_ADMIN_PASSWORD')) {
                $this->command?->warn("Super Admin created: {$email} / {$password}  (shown once — change it after first login)");
            }
        }
    }
}
