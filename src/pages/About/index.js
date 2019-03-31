import universal from 'react-universal-component'

export default universal(() => import('./About'), {
  timeout: 60000
})
