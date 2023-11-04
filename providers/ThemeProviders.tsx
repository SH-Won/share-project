'use client'
import { theme } from '@/styles/theme'
import { ThemeProvider } from 'styled-components'

const ThemeProviders = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
export { ThemeProviders }
