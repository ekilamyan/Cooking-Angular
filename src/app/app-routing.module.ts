import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RecipeInstructionsPageComponent } from './recipe-instructions-page/recipe-instructions-page.component';
import { MyPantryComponent } from './my-pantry/my-pantry.component';
import { SearchPageComponent } from './search-page/search-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/recipe-instructions', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'recipe-instructions',
    component: RecipeInstructionsPageComponent,
    data: { id: '000000' },
  },
  { path: 'my-pantry', component: MyPantryComponent },
  { path: 'search', component: SearchPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
