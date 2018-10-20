import { graphql } from 'gatsby'
import * as React from 'react'
import { CourseOverview, MarkdownData } from '../components/CourseOverview'
import { Link } from '../components/Link'

interface Props {
  data: {
    allMarkdownRemark: {
      edges: { node: MarkdownData }[]
    } | null
  }
}

const description = (
  <>
    This course emerged in the context of{' '}
    <Link to="https://opencampus.sh">opencampus.sh</Link> and will be held in
    the winter of 2018/2019
  </>
)

const PageTemplate: React.SFC<Props> = ({ data: { allMarkdownRemark } }) => {
  return (
    <CourseOverview
      title="Internet of Things"
      description={description}
      lessons={
        allMarkdownRemark ? allMarkdownRemark.edges.map(e => e.node) : []
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
