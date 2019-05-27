import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

import { AppComponent } from './app.component';
import { LaanComponent } from './laan/laan.component';
import { SparingComponent } from './sparing/sparing.component';

@NgModule({
  declarations: [
    AppComponent,
    LaanComponent,
    SparingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule // Add this
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
