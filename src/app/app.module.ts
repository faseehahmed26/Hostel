import { BrowserModule } from '@angular/platform-browser'; 
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from'@angular/platform-browser/animations'; 
import { MatToolbarModule } from'@angular/material/toolbar';  
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from'@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatSliderModule} from '@angular/material/slider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms'; 
import { baseURL } from './shared/baseurl';
import { AppComponent } from './app.component';

import 'hammerjs';

import { HostelService } from './services/hostel.service';
import { ProcessHTTPMsgService } from './services/process-httpmsg.service';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HosteldetailComponent } from './hosteldetail/hosteldetail.component';
import { HighlightDirective } from './directives/highlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    LoginComponent,
    HosteldetailComponent,
    HighlightDirective
  ],
  imports: [
     BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
     MatSelectModule,
    MatSlideToggleModule,
    MatButtonModule,
     MatFormFieldModule, 
    MatInputModule,
    MatCheckboxModule,
    FlexLayoutModule,
    MatDialogModule,
    MatDatepickerModule,
    AppRoutingModule,
    FormsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatNativeDateModule,
     HttpClientModule,
     HttpModule
  ],
  providers: [
  HostelService,
  ProcessHTTPMsgService,
  {provide: 'BaseURL', useValue: baseURL}
  ],
  entryComponents: [
        LoginComponent,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
