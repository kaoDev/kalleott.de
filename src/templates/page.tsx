import { graphql } from 'gatsby'
import * as React from 'react'
// @ts-ignore
import rehypeReact from 'rehype-react'
import { ComponentPlayGround } from '../components/ComponentPlayGround'
import { Container } from '../components/Container'
import { Page } from '../components/Page'
import { IndexLayout } from '../layouts'
import { Link } from '../components/Link'
import { CodeView } from '../components/CodeView'
import { SiteTitle } from '../components/SiteTitle'

interface PageTemplateProps {
  data: {
    site: {
      siteMetadata: {
        title: string
        description: string
        author: {
          name: string
          url: string
        }
      }
    }
    markdownRemark: {
      htmlAst: object
      excerpt: string
      frontmatter: {
        title: string
      }
    }
  }
}

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    'component-playground': ComponentPlayGround,
    code: CodeView,
    a: Link,
  },
}).Compiler

const PageTemplate: React.SFC<PageTemplateProps> = ({ data }) => (
  <IndexLayout>
    <Page>
      <Container>
        <SiteTitle>{data.markdownRemark.frontmatter.title}</SiteTitle>
        {renderAst(data.markdownRemark.htmlAst)}
      </Container>
    </Page>
  </IndexLayout>
)

export default PageTemplate

export const query = graphql`
  query PageTemplateQuery($slug: String!) {
    site {
      siteMetadata {
        title
        description
        author {
          name
          url
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
      excerpt
      frontmatter {
        title
      }
    }
  }
`
