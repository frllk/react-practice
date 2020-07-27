/**
 * 组件跨层级通信 - Context
 */
import React from 'react'

export const ThemeContext = React.createContext()
export const ThemeProvider = ThemeContext.Provider
export const ThemeConsumer = ThemeContext.Consumer

export const UserContext = React.createContext()