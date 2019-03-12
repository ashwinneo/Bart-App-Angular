import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BartStationsComponent } from './bart-stations/bart-stations.component';
import { HttpClientModule } from '@angular/common/http';
import { BartStationsServiceService } from './bart-stations/bart-stations-service.service';
import { BartStationComponent } from './bart-station/bart-station.component';

import { FormsModule } from '@angular/forms';
import { ScheduleComponent } from './schedule/schedule.component';
import { GoogleMapsComponent } from './google-maps/google-maps.component';
import { AgmCoreModule } from '@agm/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AgmDirectionModule } from 'agm-direction';
import { CountdownModule } from 'ngx-countdown';
@NgModule({
  declarations: [
    AppComponent,
    BartStationsComponent,
    BartStationComponent,
    ScheduleComponent,
    GoogleMapsComponent
  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDaYQRdZCQAhvwSuwZohDjfOY3HHdGXc4M'
    }),
    NgxSpinnerModule,
    AgmDirectionModule,
    CountdownModule
  ],
  providers: [BartStationsServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
