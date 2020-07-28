import React, { useContext } from 'react'
import { ThemeContext, UserContext } from './Context'

export default function UserContextPage (props) {
  const ctx = useContext(UserContext)
  const themeCtx = useContext(ThemeContext)
  console.log(ctx)



  return (
    <div className="border">
      <h3 className={themeCtx.themeColor}>UserContextPage</h3>
      <p>{ctx.name}</p>
    </div>
  )
}
