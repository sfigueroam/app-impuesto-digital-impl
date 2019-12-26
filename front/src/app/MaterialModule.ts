import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';




@NgModule({
    imports: [
            MatButtonModule, MatRadioModule, MatInputModule, MatSlideToggleModule,
            MatProgressSpinnerModule, MatCheckboxModule,MatTabsModule,MatDatepickerModule,MatNativeDateModule,
            MatSelectModule,MatPaginatorModule,MatFormFieldModule, MatCardModule
            ],

    exports: [
        MatButtonModule, MatRadioModule, MatInputModule, MatSlideToggleModule,
        MatProgressSpinnerModule, MatCheckboxModule,MatTabsModule,MatDatepickerModule,MatNativeDateModule,
        MatSelectModule,MatPaginatorModule, MatFormFieldModule, MatCardModule
        ],
  })




















export class MaterialModule { }