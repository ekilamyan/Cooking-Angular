import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { RecipeInstructionsPageComponent } from './recipe-instructions-page/recipe-instructions-page.component';
import { MyPantryComponent } from './my-pantry/my-pantry.component';

const routes: Routes = [
  { path: '', redirectTo: '/recipe-instructions', pathMatch: 'full' },
  { path: 'homepage', component: HomepageComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'recipe-instructions', component: RecipeInstructionsPageComponent },
  { path: 'my-pantry', component: MyPantryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
