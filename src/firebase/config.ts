import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'SUA_API_KEY',
  authDomain: 'morai-app.firebaseapp.com',
  projectId: 'morai-app',
  storageBucket: 'morai-app.appspot.com',
  messagingSenderId: '...',
  appId: '...'
};

export const firebaseApp = initializeApp(firebaseConfig);
