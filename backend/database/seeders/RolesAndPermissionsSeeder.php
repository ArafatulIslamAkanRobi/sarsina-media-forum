<?php

namespace Database\Seeders;

use App\Support\Rbac;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

/** Idempotent: safe to re-run after editing App\Support\Rbac. */
class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        app(PermissionRegistrar::class)->forgetCachedPermissions();

        foreach (Rbac::allPermissions() as $name) {
            Permission::findOrCreate($name, 'web');
        }
        foreach (Rbac::roles() as $name => $role) {
            $perms = [];
            foreach ($role['grants'] as $module => $actions) {
                foreach ($actions as $a) {
                    $perms[] = "{$module}.{$a}";
                }
            }
            Role::findOrCreate($name, 'web')->syncPermissions($perms);
        }

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }
}
