import React from 'react'
import styled from 'react-emotion'
import { keyframes } from 'emotion'
import { colors } from '../styles/variables'

const reload = () => location.reload()

const ripple = keyframes`
from {
    transform: scale(0.01);
}
`

interface Props {
  dismiss: () => void
}

const ToastButton = styled('button')`
  background: transparent;
  border: none;
  color: ${colors.accent};
  outline: none;
  cursor: pointer;
  padding: 8px;
  position: relative;
  overflow: hidden;

  &:hover {
    text-decoration: underline;
  }

  &:focus:before {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 120%;
    height: 0;
    padding: 0 0 120%;
    margin: -60% 0 0 -60%;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    transform-origin: center;
    will-change: transform;
    animation: ${ripple} 300ms ease-out forwards 1;
    pointer-events: none;
  }
`

const Wrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
})
const ButtonRow = styled('div')({
  display: 'flex',
  alignItems: 'center',
})

export const PageReloadToast = ({ dismiss }: Props) => (
  <Wrapper>
    <span>Hey there is some new content for you</span>
    <ButtonRow>
      <ToastButton onClick={reload}>Reload</ToastButton>
      <ToastButton onClick={dismiss}>Dismiss</ToastButton>
    </ButtonRow>
  </Wrapper>
)
