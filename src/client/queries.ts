import { queryOptions } from "@tanstack/react-query"
import { auth, userRepo } from "."

export const sessionQueryOptions = queryOptions({
  queryKey: ["session"],
  queryFn: auth.getSession,
  staleTime: Infinity,
})

export const profileQueryOptions = queryOptions({
  queryKey: ["profile"],
  queryFn: userRepo.getProfile,
})

export const userQueryOptions = queryOptions({
  queryKey: ["user"],
  queryFn: auth.getUser,
})
