'use strict'

const siteUrl = 'https://kalleott.de'
const colors = require('./src/styles/colors.json')

module.exports = {
  siteMetadata: {
    title: 'KO',
    description:
      'Personal Website of Kalle Ott, software developer from northern germany',
    siteUrl: siteUrl,
    author: {
      name: 'Kalle Ott',
      url: 'https://twitter.com/kaoDev',
      email: 'kalle-ott@live.de',
    },
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/uploads`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'courses',
        path: `${__dirname}/src/courses`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          // 'gatsby-remark-component',
          {
            resolve: `gatsby-remark-relative-images`,
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1rem',
            },
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          // {
          //   resolve: `remark-social-cards`,
          //   options: {
          //     title: {
          //       // This is the frontmatter field the title should come from
          //       field: 'title',
          //       // Currently only supports DejaVuSansCondensed
          //       font: 'DejaVuSansCondensed',
          //       color: 'white', // black|white
          //       size: 48, // 16|24|32|48|64
          //       style: 'bold', // normal|bold|italic
          //       x: null, // Will default to xMargin
          //       y: null, // Will default to yMargin
          //     },
          //     meta: {
          //       // The parts array is what generates the bottom text
          //       // Pass an array with strings and objects
          //       // The following array will generate:
          //       // "- Author Name » September 13"
          //       // The objects are used to pull data from your markdown's
          //       // frontmatter. { field: "author" } pulls the author set
          //       // in the frontmatter. { field: "category" } would pull
          //       // the category set. Any field can be used as parts
          //       // Note: Only pass the "format" property on date fields
          //       parts: [
          //         { field: 'excerpt' },
          //         '\n',
          //         { field: 'author' },
          //         ' » ',
          //         { field: 'date', format: 'DD.MM.YYYY' },
          //       ],
          //       // Currently only supports DejaVuSansCondensed
          //       // More fonts coming soon!
          //       font: 'DejaVuSansCondensed',
          //       color: 'white', // black|white
          //       size: 24, // 16|24|32|48|64
          //       style: 'normal', // normal|bold|italic
          //       x: null, // Will default to xMargin
          //       y: null, // Will default to cardHeight - yMargin - size
          //     },
          //     background: colors.accent, // Background color for the card
          //     xMargin: 24, // Edge margin used when x value is not set
          //     yMargin: 24, // Edge margin used when y value is not set
          //   },
          // },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1140,
              quality: 90,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: 'gatsby-remark-embed-video',
            options: {
              width: '100%',
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              height: 400, // Optional: Overrides optional.ratio
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Kalle Ott`,
        short_name: `KO`,
        start_url: `/`,
        background_color: colors.light,
        theme_color: colors.accent,
        display: `minimal-ui`,
        icon: `src/assets/images/KO.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
    'gatsby-plugin-catch-links',
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: siteUrl,
      },
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  limit: 1000,
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: {frontmatter: { draft: { ne: true } }}
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'kalleott.de RSS Feed',
          },
        ],
      },
    },
  ],
}
