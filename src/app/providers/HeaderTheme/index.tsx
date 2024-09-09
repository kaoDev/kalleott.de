'use client'

import type { Theme } from '@/providers/Theme/types'

import React, { createContext, useCallback, useContext, useState } from 'react'

import canUseDOM from '../../utilities/canUseDOM'

export interface ContextType {
  headerTheme: Theme | undefined
  setHeaderTheme: (theme: Theme | undefined) => void
}

const initialContext: ContextType = {
  headerTheme: undefined,
  setHeaderTheme: () => undefined,
}

const HeaderThemeContext = createContext(initialContext)

export const HeaderThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [headerTheme, setThemeState] = useState<Theme | undefined>(
    canUseDOM ? (document.documentElement.getAttribute('data-theme') as Theme) : undefined,
  )

  const setHeaderTheme = useCallback((themeToSet: Theme | undefined) => {
    setThemeState(themeToSet)
  }, [])

  return (
    <HeaderThemeContext.Provider value={{ headerTheme, setHeaderTheme }}>
      {children}
    </HeaderThemeContext.Provider>
  )
}

export const useHeaderTheme = (): ContextType => useContext(HeaderThemeContext)