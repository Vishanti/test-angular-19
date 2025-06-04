import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'character-list', pathMatch: 'full' },
    {
        path: 'character-list',
        loadComponent: () => import('./components/character-list/character-list.component').then(m => m.CharacterListComponent)
    },
    {
        path: 'character-detail',
        loadComponent: () => import('./components/character-detail/character-detail.component').then(m => m.CharacterDetailComponent)
    },
];
