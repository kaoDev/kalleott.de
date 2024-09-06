import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'
import { RichText } from 'src/app/components/RichText'
import { ClientFormBlock } from './ClientFormBlock'

export type Value = unknown

export interface Property {
  [key: string]: Value
}

export interface Data {
  [key: string]: Property | Property[]
}

export type FormBlockType = {
  blockName?: string | null
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: FormType['confirmationMessage']
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { confirmationMessage } = {},
    introContent,
  } = props

  const introText =
    enableIntro && introContent ? (
      <RichText className="mb-8" content={introContent} enableGutter={false} />
    ) : null

  const confirmationText = <RichText content={confirmationMessage} />

  return (
    <ClientFormBlock
      introText={introText}
      confirmationText={confirmationText}
      form={formFromProps}
    />
  )
}
