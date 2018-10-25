import { graphql, StaticQuery } from 'gatsby'
import * as React from 'react'
import Helmet from 'react-helmet'
import { LayoutRoot } from '../components/LayoutRoot'
import '../styles/normalize'

type StaticQueryProps = {
  site: {
    siteMetadata: {
      title: string
      description: string
    }
  }
}

export const IndexLayout: React.SFC = ({ children }) => (
  <StaticQuery
    query={graphql`
      query IndexLayoutQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={(data: StaticQueryProps) => (
      <LayoutRoot>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            {
              name: 'description',
              content: data.site.siteMetadata.description,
            },
            {
              name: 'keywords',
              content:
                'software engineer, software developer, opensource, react, iot, courses, opencampus',
            },
          ]}
        >
          <html lang="en" />
        </Helmet>
        {children}
      </LayoutRoot>
    )}
  />
)
