'use client'

import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
  if (typeof window === 'undefined') {
    return null
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    throw new Error('Supabase env variables NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY are missing.')
  }

  return createBrowserClient(url, key)
}
