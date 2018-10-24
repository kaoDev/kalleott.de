import React from 'react'
import { IndexLayout } from '../layouts'
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
  hint?: React.ReactNode
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
  hint?: React.ReactNode
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

const Hint = styled.div({
  background: colors.accent,
  color: colors.light,
  position: 'absolute',
  bottom: px(dimensions.base),
  textShadow: 'none',
  fontSize: px(dimensions.base * 2),
  padding: `0 ${px(dimensions.base * 0.5)}`,
})

const SessionHint = styled.div({
  background: colors.accent,
  color: colors.light,
  position: 'absolute',
  top: px(dimensions.base * 0.5),
  right: px(dimensions.base * -2),
  transform: `rotate(-15deg)`,
  textShadow: 'none',
  fontSize: px(dimensions.base * 2),
  padding: `0 ${px(dimensions.base * 0.5)}`,
  transition: 'opacity 0.1s ease-in-out',
  opacity: 0,
})

const SessionArticle = styled.article({
  position: 'relative',
  [`:hover ${SessionHint}`]: {
    opacity: 1,
  },
})

const DescriptionWrapper = styled.div({
  paddingBottom: px(dimensions.base * 5),
})

export const BlogOverview: React.SFC<Props> = ({
  lessons,
  title,
  description,
  hint,
}) => {
  return (
    <IndexLayout>
      <Container>
        <SiteTitle>
          {title}
          {hint && <Hint>{hint}</Hint>}
        </SiteTitle>
        <DescriptionWrapper>{description}</DescriptionWrapper>
        <ArticlesGrid>
          {lessons.map(lesson => {
            return (
              <ArticleLink key={lesson.id} to={lesson.slug}>
                <SessionArticle>
                  <h4>
                    {lesson.title}
                    {lesson.hint && <SessionHint>{lesson.hint}</SessionHint>}
                  </h4>
                  <div>{lesson.excerpt}</div>
                </SessionArticle>
              </ArticleLink>
            )
          })}
        </ArticlesGrid>
      </Container>
    </IndexLayout>
  )
}
