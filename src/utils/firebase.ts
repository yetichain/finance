import { isDev } from 'config'
import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDX02NCuiQZlBPFUTZxbepjBbtULAU1Se0',
  authDomain: 'alium-frontend.firebaseapp.com',
  databaseURL: 'https://alium-frontend-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'alium-frontend',
  storageBucket: 'alium-frontend.appspot.com',
  messagingSenderId: '665962926278',
  appId: '1:665962926278:web:033999395f4b51a00b87c7',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app()
}

const db = firebase.firestore()

type dbMailListCreateEmail = (email: string) => Promise<boolean | null>

export const dbMailListCreateEmail: dbMailListCreateEmail = async (email) => {
  try {
    const collectionPath = isDev ? 'maillist-dev' : 'maillist'
    const docRef = db.collection(collectionPath).doc(email)
    return docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          return false
        } else {
          return docRef
            .set({ datetime: new Date().toISOString().slice(0, 19).replace('T', ' ') })
            .then(() => {
              return true
            })
            .catch((error) => {
              console.error('Error writing document: ', error)
              return null
            })
        }
      })
      .catch((error) => {
        console.error('Error getting document:', error)
      })
  } catch (e) {
    console.error(e)
  }
  return null
}
