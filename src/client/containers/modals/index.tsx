import universal from 'react-universal-component'

export default universal(() => import('./Modals'), {
  loading: () => null
})
