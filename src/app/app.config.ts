import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import {getAuth, provideAuth} from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp({
      projectId: "fir-portal-b9364",
      appId: "1:51536227213:web:3c812adb4c18691387abc4",
      storageBucket: "fir-portal-b9364.firebasestorage.app",
      apiKey: "AIzaSyCLbCZpXGSi2L36xGitYHQ2lNt4ceteP54",
      authDomain: "fir-portal-b9364.firebaseapp.com",
      messagingSenderId: "51536227213" })),
    provideFirestore(() => getFirestore()), provideStorage(() => getStorage()), provideAuth(() => getAuth())]
};
