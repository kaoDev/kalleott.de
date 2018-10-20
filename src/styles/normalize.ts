import { injectGlobal } from 'emotion'
import { dimensions, fonts, colors, breakpoints } from './variables'
import { px } from './utils'

import BigJohnRegular from '../assets/fonts/BigJohnPRO-Regular.otf'
import BigJohnBold from '../assets/fonts/BigJohnPRO-Bold.otf'
import BigJohnLight from '../assets/fonts/BigJohnPRO-Light.otf'

// tslint:disable-next-line:no-unused-expression
injectGlobal`
  @font-face {
    font-family: 'Big John Pro';
  src: url('${BigJohnRegular}') format('opentype');
    font-weight: normal;
  }
  @font-face {
    font-family: 'Big John Pro';
    src: url('${BigJohnBold}') format('opentype');
    font-weight: bold;
  }
  @font-face {
    font-family: 'Big John Pro';
    src: url('${BigJohnLight}') format('opentype');
    font-weight: lighter;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    font-size: ${px(dimensions.fontSize.regular)};
    line-height: ${dimensions.lineHeight.regular};
    -webkit-font-smoothing: antialiased;
  }

  body {
    margin: 0;
    width: 100%;
    font-family: ${fonts.sansSerif};
    color: ${colors.dark};
    background-color: ${colors.light};
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
  }

  a {
    color: ${colors.dark};
    text-shadow: -1px 1px 0px ${colors.accent};
    text-decoration: none;

    &:hover,
    &:focus {
      color: ${colors.dark};
      text-shadow: -1px 1px 0px ${colors.accent2};
    }
  }

  img {
    max-width: 100%;
    object-fit: contain;
    position: relative;
  }


  h1, h2, h3, h4, h5, h6 {
    margin-top: 24px;
    margin-bottom: 8px;
    font-weight: 600;
    line-height: ${dimensions.lineHeight.heading};
    text-rendering: optimizeLegibility;
  }

  h1 {
    margin-top: 0;
    font-size: ${px(dimensions.headingSizes.h1)};
  }

  h2 {
    font-size: ${px(dimensions.headingSizes.h2)};
  }

  h3 {
    font-size: ${px(dimensions.headingSizes.h3)};
  }

  h4, h5, h6 {
    font-size: ${px(dimensions.headingSizes.h4)};
  }

  p {
    margin-top: 0;
    margin-bottom: ${px(dimensions.base * 2)};
  }

  ul,
  ol,
  dl {
    margin-top: 0;
    margin-bottom: ${px(dimensions.base * 2)};
  }

  hr {
    position: relative;
    margin: ${px(dimensions.base * 3)} 0;
    border: 0;
    border-top: 1px solid ${colors.accent};
  }

  blockquote {
    margin: ${px(dimensions.base * 1.6)} 0;
    padding: ${px(dimensions.base)} ${px(dimensions.base * 2)};
    border-left: ${px(dimensions.base * 0.5)} solid ${colors.accent};

    p {
      &:last-child {
        margin-bottom: 0;
      }
    }

    @media (min-width: ${px(breakpoints.md)}) {
      padding-right: ${px(dimensions.base * 10)};
      padding-left: ${px(dimensions.base * 2.5)};
    }
  }
`
