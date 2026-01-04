import { AuthError, User } from "@supabase/supabase-js"
import { FamilyTaskSupabaseClient } from "../../client"

async function getUser(client: FamilyTaskSupabaseClient): Promise<User> {
  const { error, data } = await client.auth.getUser()

  if (error) throw error
  if (data.user == null)
    throw new AuthError("Unauthorized", 401, "no_authorization")

  return data.user
}

export { getUser }
