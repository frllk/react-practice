import dynamic from 'dva/dynamic'
import app from '../app'

export const UserPageDynamic = dynamic({
  app,
  models: () => [import('../models/user')],
  component: () => import('../routes/UserPage')
})

export const ExampleDynamic = dynamic({
  app,
  models: () => [import('../models/example')],
  component: () => import('../routes/ExamplePage')
})