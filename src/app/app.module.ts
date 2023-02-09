import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MaterialImportsModule } from 'src/material-imports.module';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MyPantryComponent } from './my-pantry/my-pantry.component';
import { RecipeInstructionsPageComponent } from './recipe-instructions-page/recipe-instructions-page.component';
import { SignInComponent } from './sign-in/sign-in.component';

import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { SuggestionsComponent } from './shared/components/suggestions/suggestions.component';
import { IngredientDialogComponent } from './dialogs/ingredient-dialog/ingredient-dialog.component';
import { RecipeSearchDialogComponent } from './dialogs/recipe-search-dialog/recipe-search-dialog.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { FiltersDialogComponent } from './dialogs/filters-dialog/filters-dialog.component';
import { SettingsComponent } from './settings/settings.component';
import { StartCookingComponent } from './start-cooking/start-cooking.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { IntolerancesDialogComponent } from './dialogs/intolerances-dialog/intolerances-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomepageComponent,
    MyPantryComponent,
    RecipeInstructionsPageComponent,
    SignInComponent,
    FooterComponent,
    NavbarComponent,
    SuggestionsComponent,
    IngredientDialogComponent,
    RecipeSearchDialogComponent,
    SearchPageComponent,
    FiltersDialogComponent,
    SettingsComponent,
    StartCookingComponent,
    SignUpComponent,
    IntolerancesDialogComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialImportsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
