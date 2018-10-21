import { graphql } from 'gatsby'
import * as React from 'react'
import {
  BlogOverview,
  mapMarkdownToSessionData,
  MarkdownData,
} from '../components/BlogOverview'
import { courseData } from '../courses/iot'

interface Props {
  data: {
    allMarkdownRemark: {
      edges: { node: MarkdownData }[]
    } | null
  }
}

const PageTemplate: React.SFC<Props> = ({ data: { allMarkdownRemark } }) => {
  return (
    <BlogOverview
      title={courseData.title}
      description={courseData.excerpt}
      lessons={
        allMarkdownRemark
          ? allMarkdownRemark.edges.map(e => mapMarkdownToSessionData(e.node))
          : []
      }
    />
  )
}

export default PageTemplate

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { frontmatter: { course: { eq: "Internet of Things" } } }
      sort: { fields: frontmatter___date, order: ASC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date
            course
          }
          excerpt
          fields {
            slug
          }
        }
      }
    }
  }
`
