/**
 * This configuration is used to for the Sanity Studio that's mounted on the `\src\app\studio\[[...tool]]\page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'

// Environment variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '0l9mm7zn'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-09-09'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
  // Dosya yükleme boyut limitini artır
  api: {
    projectId,
    dataset,
    apiVersion,
    // Video dosyaları için boyut limitini artır (100MB)
    useCdn: false,
  },
})
