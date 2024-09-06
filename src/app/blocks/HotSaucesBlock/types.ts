import type { Page } from '../../../payload-types'

export type HotSaucesBlockProps = Extract<Page['layout'][0], { blockType: 'hotSauces' }>
