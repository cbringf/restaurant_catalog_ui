import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,MatFormFieldModule,MatDividerModule,
  MatToolbarModule, MatMenuModule,MatIconModule, MatProgressSpinnerModule, MatOptionModule, MatSelectModule, MatPaginatorModule,
} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule, 
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatOptionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDividerModule,
    MatPaginatorModule
  ],
  exports: [
    CommonModule,
    MatToolbarModule, 
    MatButtonModule, 
    MatCardModule, 
    MatInputModule, 
    MatDialogModule, 
    MatTableModule, 
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatOptionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDividerModule,
    MatPaginatorModule
   
   ],
})
export class MaterialModule { }