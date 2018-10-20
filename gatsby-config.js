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
        name: 'content',
        path: `${__dirname}/src/content`,
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
              width: 800,
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
    {
      resolve: `offline`,
    },
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
  ],
}
