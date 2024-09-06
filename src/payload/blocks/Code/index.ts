import type { Block } from 'payload'

export const Code: Block = {
  slug: 'code',
  fields: [
    {
      name: 'language',
      type: 'select',
      defaultValue: 'typescript',
      options: [
        {
          label: 'Typescript',
          value: 'typescript',
        },
        {
          label: 'Javascript',
          value: 'javascript',
        },
        {
          label: 'CSS',
          value: 'css',
        },
        {
          label: 'HTML',
          value: 'html',
        },
        {
          label: 'JSON',
          value: 'json',
        },
        {
          label: 'Gitignore',
          value: 'gitignore',
        },
        {
          label: 'Shell',
          value: 'shell',
        },
        {
          label: 'Config',
          value: 'conf',
        },
        {
          label: 'YAML',
          value: 'yaml',
        },
      ],
    },
    {
      name: 'code',
      type: 'code',
      label: false,
      required: true,
    },
  ],
}
