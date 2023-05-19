import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuardService } from './shared/services/auth-guard.service';

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
import { PantryListComponent } from './shared/components/pantry-list/pantry-list.component';
import { CodeConfirmationDialogComponent } from './dialogs/code-confirmation-dialog/code-confirmation-dialog.component';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ShowcaseRecipeComponent } from './shared/components/showcase-recipe/showcase-recipe.component';
import { EmptyPantryDialogComponent } from './dialogs/empty-pantry-dialog/empty-pantry-dialog.component';

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
    PantryListComponent,
    CodeConfirmationDialogComponent,
    ShowcaseRecipeComponent,
    EmptyPantryDialogComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialImportsModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
