'use client'

import React from 'react'
import { SelectField, useField } from '@payloadcms/ui'
import type { SelectFieldClientComponent } from 'payload'

// Color mappings for each texture background
const textureColors: Record<string, string> = {
  'cr-bg-natural-a500': '#ffc72c',
  'cr-bg-natural-s100': '#e3f0f6',
  'cr-bg-natural-s900': '#0c435a',
  'cr-bg-natural-d100': '#f4f4f5',
  'cr-bg-natural-d900': '#3f3f46',
}

export const TextureBackgroundField: SelectFieldClientComponent = (props) => {
  const { value } = useField({ path: props.path })

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        marginBottom: '16px',
      }}
    >
      <div style={{ flex: 1 }}>
        <SelectField {...props} />
      </div>
      {value && textureColors[value as string] && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            paddingTop: '28px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: textureColors[value as string],
              border: '1px solid #ddd',
              borderRadius: '4px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              flexShrink: 0,
            }}
          />
          <div style={{ fontSize: '12px', color: '#666' }}>
            <div style={{ fontWeight: '500', color: '#333' }}>{value as string}</div>
            <div style={{ fontFamily: 'monospace', fontSize: '11px' }}>
              {textureColors[value as string]}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
