import { graphql } from 'gatsby'
import * as React from 'react'
// @ts-ignore
import rehypeReact from 'rehype-react'
import { ComponentPlayGround } from '../components/ComponentPlayGround'
import { Container } from '../components/Container'
import { IndexLayout } from '../layouts'
import { Link } from '../components/Link'
import { CodeView } from '../components/CodeView'
import { SiteTitle } from '../components/SiteTitle'
import styled from 'react-emotion'
import { colors, dimensions } from '../styles/variables'
import { px } from '../styles/utils'
import { format } from 'date-fns'

const PublishDate = styled.div({
  color: colors.dark,
  fontSize: px(dimensions.fontSize.small),
  textAlign: 'right',
})

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
      frontmatter: {
        title: string
        date: string
      }
    }
  }
}

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    'component-playground': ComponentPlayGround,
    code: CodeView,
    a: ({
      href,
      unselectable,
      ...props
    }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <Link
        unselectable={unselectable === 'on' || undefined}
        to={href || ''}
        {...props}
      />
    ),
  },
}).Compiler

const PageTemplate: React.SFC<PageTemplateProps> = ({ data }) => (
  <IndexLayout>
    <Container>
      <SiteTitle>{data.markdownRemark.frontmatter.title}</SiteTitle>
      <PublishDate>
        {format(data.markdownRemark.frontmatter.date, 'DD-MM-YYYY')}
      </PublishDate>
      {renderAst(data.markdownRemark.htmlAst)}
    </Container>
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
      frontmatter {
        title
        date
      }
    }
  }
`
