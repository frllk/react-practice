/**
 * useContext方式获取数据
 */
import React, { useContext } from 'react'
import { ThemeContext } from '../Context'

export default function UserPage () {
  const ctx = useContext(ThemeContext)
  console.log(ctx)
  return (
    <div>
      <h4 style={{ color: ctx.themeColor }}>UserPage</h4>
    </div>
  )
}
