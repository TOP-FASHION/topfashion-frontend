import universal from 'react-universal-component'

export default universal(() => import('./NotFound'), {
  timeout: 60000
})
