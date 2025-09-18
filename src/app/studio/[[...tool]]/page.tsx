'use client'

import dynamic from 'next/dynamic'
import config from '../../../../sanity.config'

const NextStudio = dynamic(() => import('next-sanity/studio').then(mod => ({ default: mod.NextStudio })), {
  ssr: false,
  loading: () => (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '18px',
      fontFamily: 'Arial, sans-serif'
    }}>
      Loading Sanity Studio...
    </div>
  )
})

export default function StudioPage() {
  return <NextStudio config={config} />
}
