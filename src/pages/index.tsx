import { graphql } from 'gatsby'
import * as React from 'react'
import {
  BlogOverview,
  MarkdownData,
  mapMarkdownToSessionData,
} from '../components/BlogOverview'
import { Link } from '../components/Link'
import { SocialLinks } from '../components/SocialLinks'

interface Props {
  data: {
    allMarkdownRemark: {
      edges: { node: MarkdownData }[]
    } | null
  }
}

const description = (
  <>
    <p>
      Hi I'm Kalle, a software developer from Kiel working for{' '}
      <Link to="https://cap3.de">Cap3</Link>. Besides my day-job I like spread
      my knowledge and so I started to work with{' '}
      <Link to="https://opencampus.sh">opencampus.sh</Link> to offer free
      courses on web-development.
    </p>
    <p>You can find and contact me on the following platforms:</p>
    <SocialLinks />
  </>
)

const IndexPage: React.SFC<Props> = ({ data: { allMarkdownRemark } }) => (
  <BlogOverview
    title="kao's Blog"
    description={description}
    lessons={
      allMarkdownRemark
        ? allMarkdownRemark.edges.map(e => mapMarkdownToSessionData(e.node))
        : []
    }
  />
)

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
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

export default IndexPage
