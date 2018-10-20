import React from 'react'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import styled from 'react-emotion'

const LiveEditWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
})

export const ComponentPlayGround = ({
  raw = '',
  complex = '',
  sample = '',
}) => {
  const noInline = !!complex.length

  const code =
    sample.length > 0
      ? require(`!raw-loader!../samples/${sample}`)
      : noInline
        ? complex
        : raw

  return (
    <LiveProvider mountStylesheet={false} code={code} noInline={noInline}>
      <LiveEditWrapper>
        <LiveEditor
          className={'language-jsx'}
          css={{
            minWidth: '300px',
            flex: 1,
            overflow: 'auto',
            width: '100%',
            fontFamily: 'Dank Mono, monospace',
          }}
        />
        <LivePreview
          css={{
            minWidth: '300px',
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            border: '1px solid rgba(0,0,0,0.1)',
          }}
        />
      </LiveEditWrapper>
      <LiveError
        css={{
          fontFamily: 'monospace',
          padding: '8px',
          backgroundColor: '#ff5555',
          color: 'rgba(255, 255, 255, 0.9)',
        }}
      />
    </LiveProvider>
  )
}
