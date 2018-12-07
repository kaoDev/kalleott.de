// @ts-check
import { toast, ToastContainer } from 'react-toastify'
import React from 'react'
import { css } from 'emotion'
import { PageReloadToast } from './src/components/PageReloadToast'
import 'prismjs/themes/prism-tomorrow.css'
import 'react-toastify/dist/ReactToastify.css'
import { colors } from './src/styles/variables'

const darkToast = css({
  background: colors.dark,
  color: colors.light,
  '.Toastify__close-button--default': {
    color: colors.light,
  },
})

const fixMobileWidth = css({
  '@media only screen and (max-width: 480px)': {
    width: '100%',
  },
})

const showReloadToast = () => {
  const dismiss = () => {
    toast.dismiss(id)
  }

  const id = toast(<PageReloadToast dismiss={dismiss} />, {
    autoClose: false,
    position: 'bottom-right',
    className: darkToast,
  })
}

export const onServiceWorkerUpdateFound = () => {
  showReloadToast()
}

export const wrapRootElement = ({ element }) => {
  return (
    <React.Fragment>
      {element}
      <ToastContainer className={fixMobileWidth} />
    </React.Fragment>
  )
}
