import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
}

// A missing/invalid Firebase config throws synchronously here. Since this
// module is imported (transitively, via the Pinia stores) by components in
// the app's static import graph, an unhandled throw would take down the
// entire SPA before it can even mount. Fail soft instead: log a clear
// warning and leave firebaseAuth/firebaseDb undefined so the rest of the UI
// still renders — only the Firebase-backed features (login, task sync) won't
// work until FIREBASE_* env vars are set correctly.
let firebaseAuth
let firebaseDb

try {
  const firebaseApp = initializeApp(firebaseConfig)
  firebaseAuth = getAuth(firebaseApp)
  firebaseDb = getDatabase(firebaseApp)
} catch (error) {
  console.error('[Firebase] Failed to initialize — check your FIREBASE_* env vars in .env:', error)
}

export { firebaseAuth, firebaseDb }

export default () => {}
