import { database } from './firebase'
import { ref, get, set, remove } from 'firebase/database'

export interface UserData {
  username: string
  password: string
}

export interface AdminData extends UserData {}

export async function getAllUsers() {
  const usersRef = ref(database, 'users')
  const snapshot = await get(usersRef)
  return snapshot.val() || {}
}

export async function addUser(userId: string, userData: UserData) {
  const userRef = ref(database, `users/${userId}`)
  await set(userRef, userData)
}

export async function removeUser(userId: string) {
  const userRef = ref(database, `users/${userId}`)
  await remove(userRef)
}

export async function getAllAdmins() {
  const adminsRef = ref(database, 'admin')
  const snapshot = await get(adminsRef)
  return snapshot.val() || {}
}

export async function addAdmin(adminId: string, adminData: AdminData) {
  const adminRef = ref(database, `admin/${adminId}`)
  await set(adminRef, adminData)
}

export async function removeAdmin(adminId: string) {
  const adminRef = ref(database, `admin/${adminId}`)
  await remove(adminRef)
}

