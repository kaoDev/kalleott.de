import { FormFieldBlock } from '@payloadcms/plugin-form-builder/types'
import { Checkbox } from './Checkbox'
import { Country } from './Country'
import { Email } from './Email'
import { Message } from './Message'
import { Number } from './Number'
import { Select } from './Select'
import { State } from './State'
import { Text } from './Text'
import { Textarea } from './Textarea'

type AvailableBlockTypes = Exclude<FormFieldBlock['blockType'], 'payment'> | 'number'

export const fields = {
  checkbox: Checkbox,
  country: Country,
  email: Email,
  message: Message,
  number: Number,
  select: Select,
  state: State,
  text: Text,
  textarea: Textarea,
} satisfies { [key in AvailableBlockTypes]: React.FC<any> }
