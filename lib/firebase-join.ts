import { initializeApp } from "firebase/app"
import { getDatabase, ref, set, get, remove, query, orderBy } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyBNu86sP-zyEZkGB7VTUGN5f8PgSpQUsPA",
  authDomain: "join-demonff.firebaseapp.com",
  databaseURL: "https://join-demonff-default-rtdb.firebaseio.com",
  projectId: "join-demonff",
  storageBucket: "join-demonff.firebasestorage.app",
  messagingSenderId: "1090615359344",
  appId: "1:1090615359344:web:f7985bbbe849d47e0fc1b5",
  measurementId: "G-ZZ96FL2PG4"
}

const joinApp = initializeApp(firebaseConfig, 'joinApp')
const joinDb = getDatabase(joinApp)

export interface ApplicationData {
  trackingId: string
  fullName: string
  email: string
  phone: string
  inGameName: string
  uid: string
  level: string
  rank: string
  experience: string
  status: 'pending' | 'approved' | 'rejected'
  timestamp: number
}

export async function submitApplication(data: Omit<ApplicationData, 'trackingId' | 'status' | 'timestamp'>) {
  const trackingId = generateTrackingId()
  const timestamp = Date.now()
  
  await set(ref(joinDb, `applications/${trackingId}`), {
    ...data,
    trackingId,
    status: 'pending',
    timestamp
  })

  return trackingId
}

export async function getApplication(trackingId: string) {
  const snapshot = await get(ref(joinDb, `applications/${trackingId}`))
  return snapshot.val()
}

export async function updateApplicationStatus(trackingId: string, status: 'approved' | 'rejected') {
  await set(ref(joinDb, `applications/${trackingId}/status`), status)
}

export async function getAllApplications() {
  const snapshot = await get(ref(joinDb, 'applications'))
  return snapshot.val() || {}
}

export async function deleteApplication(trackingId: string) {
  await remove(ref(joinDb, `applications/${trackingId}`))
}

// Clean up applications older than 30 days
export async function cleanupOldApplications() {
  const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000)
  const snapshot = await get(ref(joinDb, 'applications'))
  const applications = snapshot.val() || {}

  Object.entries(applications).forEach(([trackingId, app]: [string, any]) => {
    if (app.timestamp < thirtyDaysAgo) {
      deleteApplication(trackingId)
    }
  })
}

function generateTrackingId() {
  return Math.random().toString(36).substring(2, 8) + 
         Math.random().toString(36).substring(2, 8)
}

export { joinDb }

