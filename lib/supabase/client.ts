'use client'

import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
  if (typeof window === 'undefined') {
    // We're on the server or in build time → return null or throw softly
    return null
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.warn('Supabase env variables are missing') // soft warning, not throw
    return null
  }

  return createBrowserClient(url, key)
}
