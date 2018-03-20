import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes, Router } from '@angular/router';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';

// Services
import { UsersdataService } from './services/usersdata.service';
import { DataService } from './services/data.service';

const appRoutes: Routes = [
  { 
    path: '',
    component: HomeComponent
  },
  {
    path: 'user/:id',
    component: UserComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
  ],
  imports: [
    // Important to import browser module first and then http module
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    UsersdataService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }