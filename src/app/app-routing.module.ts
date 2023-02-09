import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RecipeInstructionsPageComponent } from './recipe-instructions-page/recipe-instructions-page.component';
import { MyPantryComponent } from './my-pantry/my-pantry.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SettingsComponent } from './settings/settings.component';
import { StartCookingComponent } from './start-cooking/start-cooking.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'start-cooking', component: StartCookingComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'recipe-instructions',
    component: RecipeInstructionsPageComponent,
    data: { id: '000000' },
  },
  { path: 'my-pantry', component: MyPantryComponent },
  { path: 'search', component: SearchPageComponent },
  { path: 'settings', component: SettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
