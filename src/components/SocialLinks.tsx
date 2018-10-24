import React from 'react'
import styled from 'react-emotion'
import { dimensions } from '../styles/variables'
import { px } from '../styles/utils'
import { Link } from './Link'

import twitterSocial from '../assets/social-icons/twitter.svg'
import facebook from '../assets/social-icons/facebook.svg'
import linkedin from '../assets/social-icons/linkedin.svg'
import instagram from '../assets/social-icons/instagram.svg'
import xing from '../assets/social-icons/xing.svg'
import stackoverflow from '../assets/social-icons/stackoverflow.svg'
import github from '../assets/social-icons/github.svg'

const SocialIcon = styled.img({
  borderRadius: '50%',
  width: px(dimensions.base * 4),
  height: px(dimensions.base * 4),
})

const StyledLink = styled(Link)({
  borderRadius: '50%',
  width: px(dimensions.base * 4),
  height: px(dimensions.base * 4),
  transition: 'transform 0.2s ease-inout',
  [':hover']: {
    transform: 'scale(1.1)',
  },
})

const Wrapper = styled.div({
  display: 'grid',
  gridTemplateColumns: `repeat(auto-fill, ${px(dimensions.base * 4)})`,
  gridAutoRows: px(dimensions.base * 4),
  gridGap: px(dimensions.base),
})

const links = [
  {
    url: 'https://twitter.com/kaoDev',
    icon: twitterSocial,
    platform: 'Twitter',
  },
  {
    url: 'https://github.com/kaoDev',
    icon: github,
    platform: 'GitHub',
  },
  {
    url: 'https://stackoverflow.com/users/4613881/kalle',
    icon: stackoverflow,
    platform: 'stack overflow',
  },
  {
    url: 'https://www.linkedin.com/in/kalle-ott-94977073/',
    icon: linkedin,
    platform: 'LinkedIn',
  },
  {
    url: 'https://www.xing.com/profile/Kalle_Ott',
    icon: xing,
    platform: 'Xing',
  },
]

export const SocialLinks = () => (
  <Wrapper>
    {links.map(link => (
      <StyledLink key={link.url} to={link.url}>
        <SocialIcon title={link.platform} src={link.icon} />
      </StyledLink>
    ))}
  </Wrapper>
)
