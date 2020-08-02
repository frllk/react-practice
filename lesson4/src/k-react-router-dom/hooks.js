// useRouteMatch,
// useHistory,
// useLocation,
// useParams,

import React, { useContext } from 'react'
import { RouterContext } from './Context'

export function useHistory () {
  return useContext(RouterContext).history;
}
export function useLocation () {
  return useContext(RouterContext).location;
}
export function useRouteMatch () {
  return useContext(RouterContext).match;
}
export function useParams () {
  // Context 读取有一个原理：可以多层嵌套，读取离他最近的一层
  const match = useContext(RouterContext).history;
  return match ? match.params : {}
}