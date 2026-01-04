import { SupportedStorage } from "@supabase/auth-js"
import {
  createAuthClient,
  createFamilyTaskClient,
  createUserRepository,
} from "family-task-client"
import { AppState } from "react-native"
import { MMKV } from "react-native-mmkv"

const baseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
const anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY

const mmkvSupabaseStorage = new MMKV({ id: "supabase-storage" })

const supabaseStorage: SupportedStorage = {
  getItem(key) {
    return mmkvSupabaseStorage.getString(key) ?? null
  },
  removeItem(key) {
    mmkvSupabaseStorage.delete(key)
  },
  setItem(key, value) {
    mmkvSupabaseStorage.set(key, value)
  },
  isServer: false,
}

const client = createFamilyTaskClient(baseUrl, anonKey, supabaseStorage)

export function configRefreshToken() {
  AppState.addEventListener("change", (state) => {
    if (state === "active") {
      client.auth.startAutoRefresh()
    } else {
      client.auth.stopAutoRefresh()
    }
  })
}

export const auth = createAuthClient(client)

export const userRepo = createUserRepository(client)

// Export client for custom repositories
export { client }
