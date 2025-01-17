import { initializeApp } from "firebase/app"
import { getDatabase, ref, get } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyCAi7ZKwKXCnzJ2N8Cznn60bEgu70VTYlg",
  authDomain: "login-demonff.firebaseapp.com",
  databaseURL: "https://login-demonff-default-rtdb.firebaseio.com",
  projectId: "login-demonff",
  storageBucket: "login-demonff.firebasestorage.app",
  messagingSenderId: "836415110776",
  appId: "1:836415110776:web:5e7b8fa4f5bbfcac1ab78d",
  measurementId: "G-F6TY7792H4"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

export async function authenticateUser(username: string, password: string) {
  try {
    // Check admin credentials
    const adminSnapshot = await get(ref(database, 'admin'))
    const adminData = adminSnapshot.val()
    
    for (const adminKey in adminData) {
      const admin = adminData[adminKey]
      if (admin.username === username && admin.password === password) {
        return { success: true, role: 'admin' }
      }
    }

    // Check user credentials
    const usersSnapshot = await get(ref(database, 'users'))
    const userData = usersSnapshot.val()
    
    for (const userKey in userData) {
      const user = userData[userKey]
      if (user.username === username && user.password === password) {
        return { success: true, role: 'member' }
      }
    }

    return { success: false, role: null }
  } catch (error) {
    console.error('Authentication error:', error)
    return { success: false, role: null }
  }
}

export { database }

