/**
 * 组件跨层级通信 - Context
 */
import React from 'react'

export const ThemeContext = React.createContext({ themeColor: 'pink' })
export const ThemeProvider = ThemeContext.Provider
export const ThemeConsumer = ThemeContext.Consumer

export const UserContext = React.createContext()