import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RecipeSearchDialogComponent } from 'src/app/dialogs/recipe-search-dialog/recipe-search-dialog.component';

@Component({
 selector: 'app-navbar',
 templateUrl: './navbar.component.html',
 styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent implements OnInit {
 url: string
 isVisibleOnMobile = true;

 constructor(public dialog: MatDialog, public router: Router) { }

 ngOnInit(): void {
   this.url = this.router.url;
 }

 openDialog(): void {
   const dialogRef = this.dialog.open(RecipeSearchDialogComponent, {
   });
 }
}