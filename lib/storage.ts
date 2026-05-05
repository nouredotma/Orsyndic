// Supabase Storage upload utilities
// Buckets: documents, ticket-photos, avatars (public, 10MB limit)

import { supabase } from '@/lib/supabase'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!

// Upload a file to a Supabase Storage bucket
export async function uploadFile(
  bucket: 'documents' | 'ticket-photos' | 'avatars',
  file: File,
  path?: string,
): Promise<string> {
  const ext = file.name.split('.').pop() || 'bin'
  const fileName = path || `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) throw new Error(`Upload failed: ${error.message}`)

  // Return public URL
  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${data.path}`
}

// Upload a base64 data URL to Supabase Storage (for camera/preview uploads)
export async function uploadBase64(
  bucket: 'documents' | 'ticket-photos' | 'avatars',
  base64DataUrl: string,
  fileName?: string,
): Promise<string> {
  // Convert base64 to Blob
  const res = await fetch(base64DataUrl)
  const blob = await res.blob()
  const ext = blob.type.split('/')[1] || 'png'
  const name = fileName || `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const file = new File([blob], name, { type: blob.type })
  return uploadFile(bucket, file, name)
}

// Upload multiple files and return their public URLs
export async function uploadMultipleFiles(
  bucket: 'documents' | 'ticket-photos' | 'avatars',
  files: File[],
): Promise<string[]> {
  const urls = await Promise.all(files.map(file => uploadFile(bucket, file)))
  return urls
}

// Delete a file from storage by its public URL
export async function deleteFile(
  bucket: 'documents' | 'ticket-photos' | 'avatars',
  publicUrl: string,
): Promise<void> {
  const prefix = `${SUPABASE_URL}/storage/v1/object/public/${bucket}/`
  if (!publicUrl.startsWith(prefix)) return

  const path = publicUrl.replace(prefix, '')
  const { error } = await supabase.storage.from(bucket).remove([path])
  if (error) console.error('Delete failed:', error.message)
}

// Get public URL for a file path in a bucket
export function getPublicUrl(bucket: string, path: string): string {
  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`
}
