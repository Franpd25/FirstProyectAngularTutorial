import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotesService } from './services/notes.service';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider
} from '@abacritt/angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ButtonComponent } from './components/button/button.component';
import { LoginService } from './services/login.service';

@NgModule({
  declarations: [
    AppComponent
    //NoteComponent
  ],
  imports: [
    BrowserModule,
    //import HttpClientModule after BrowserModule
    HttpClientModule,
    AppRoutingModule,
    ButtonComponent,
    NavbarComponent,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // for firestore
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }) // for firestore
  ],
  providers: [NotesService,
    {
        provide: 'SocialAuthServiceConfig',
        useValue: {
          autoLogin: true,
          providers: [
            {
              id: GoogleLoginProvider.PROVIDER_ID,
              provider: new GoogleLoginProvider(
                '1088905046491-j960k8fv9rvh2q5k0hn7h2am771hbauj.apps.googleusercontent.com'
              )
            }
          ],
          onError: (err) => {
            console.log(err);
          }
        } as SocialAuthServiceConfig,
    }, LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
