import React from 'react'
import { IndexLayout } from '../layouts'
import { Page } from './Page'
import { Container } from './Container'
import { Link } from '@reach/router'

export interface MarkdownData {
  id: string
  frontmatter: {
    title: string
    date: string
    course: string
  }
  excerpt: string
  fields: {
    slug: string
  }
  html: string
}

interface Props {
  lessons: MarkdownData[]
  title: React.ReactNode
  description: React.ReactNode
}

export const CourseOverview: React.SFC<Props> = ({
  lessons,
  title,
  description,
}) => {
  return (
    <IndexLayout>
      <Page>
        <Container>
          <h1>{title}</h1>
          <p>{description}</p>
          {lessons.map(markdownData => {
            return (
              <article key={markdownData.id}>
                <Link to={markdownData.fields.slug}>
                  <h4>{markdownData.frontmatter.title}</h4>
                </Link>
                <p>{markdownData.excerpt}</p>
              </article>
            )
          })}
        </Container>
      </Page>
    </IndexLayout>
  )
}
