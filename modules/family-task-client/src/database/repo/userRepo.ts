import { FamilyTaskSupabaseClient } from "../../client"
import { Profile } from "../model"
import { getUser } from "../utils"

export const createUserRepository = (client: FamilyTaskSupabaseClient) => ({
  async getProfile(): Promise<Profile | null> {
    const user = await getUser(client)

    const { data, error } = await client
      .from("profiles")
      .select()
      .eq("id", user.id)
      .single()

    if (error) throw error

    if (!data) return null

    return data
  },
})
