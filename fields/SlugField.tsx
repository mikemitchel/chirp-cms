'use client'

import React, { useEffect } from 'react'
import { TextInput, useField, useFormFields } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'
import { formatSlug } from '../src/utils/formatSlug'

export const SlugField: TextFieldClientComponent = (props) => {
  const { value, setValue } = useField({ path: props.path })

  // Watch the title field
  const titleField = useFormFields(([fields]) => fields?.title)

  useEffect(() => {
    // Only auto-generate if slug is empty and we have a title
    if (!value && titleField?.value) {
      const slugValue = formatSlug(titleField.value as string)
      setValue(slugValue)
    }
  }, [titleField?.value, value, setValue])

  return <TextInput {...props} />
}
