// @ts-check
import 'prismjs/themes/prism-tomorrow.css'
import React from 'react'
import { IndexLayout } from './src/layouts/index'
import { Page } from './src/components/Page'
import { LayoutMain } from './src/components/LayoutMain'
import ReactGA from 'react-ga'

ReactGA.initialize('UA-118037341-2', {
  gaOptions: {},
  testMode: true,
  anonymizeIp: true,
})

export const wrapPageElement = ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return (
    <LayoutMain>
      <Page>
        <IndexLayout {...props}>{element}</IndexLayout>
      </Page>
    </LayoutMain>
  )
}

export const onRouteUpdate = _ref => {
  ReactGA.pageview(window.location.pathname + window.location.search)
}
