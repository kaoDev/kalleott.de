import React from 'react'
import { IndexLayout } from '../layouts'
import { Page } from './Page'
import { Container } from './Container'
import { Link } from '@reach/router'
import { SiteTitle } from './SiteTitle'
import styled from 'react-emotion'
import { dimensions, colors } from '../styles/variables'
import { px } from '../styles/utils'

export interface SessionData {
  id: string
  title: string
  excerpt: React.ReactNode
  slug: string
}

export interface MarkdownData {
  id: string
  frontmatter: {
    title: string
  }
  excerpt: string
  fields: {
    slug: string
  }
}

export const mapMarkdownToSessionData = (data: MarkdownData) => ({
  id: data.id,
  title: data.frontmatter.title,
  excerpt: data.excerpt,
  slug: data.fields.slug,
})

interface Props {
  lessons: SessionData[]
  title: React.ReactNode
  description: React.ReactNode
}

const ArticlesGrid = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gridAutoRows: 'minmax(150px, auto)',
  gridGap: px(dimensions.base * 3),
})

const ArticleLink = styled(Link)({
  textDecoration: 'none',
  ['> article > p']: {},
  [':hover']: {
    ['> article > h4']: {
      textDecoration: 'underline',
      textDecorationColor: colors.accent,
    },
  },
})

const DescriptionWrapper = styled.div({
  paddingBottom: px(dimensions.base * 5),
})

export const BlogOverview: React.SFC<Props> = ({
  lessons,
  title,
  description,
}) => {
  return (
    <IndexLayout>
      <Container>
        <SiteTitle>{title}</SiteTitle>
        <DescriptionWrapper>{description}</DescriptionWrapper>
        <ArticlesGrid>
          {lessons.map(markdownData => {
            return (
              <ArticleLink key={markdownData.id} to={markdownData.slug}>
                <article>
                  <h4>{markdownData.title}</h4>
                  <div>{markdownData.excerpt}</div>
                </article>
              </ArticleLink>
            )
          })}
        </ArticlesGrid>
      </Container>
    </IndexLayout>
  )
}
