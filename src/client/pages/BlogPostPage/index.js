import universal from 'react-universal-component'
import Loading from '../../components/Loading/Loading'
import FailedImport from '../../components/FailedImport/FailedImport'

export default universal(() => import('./BlogPostPage'), {
  loading: Loading,
  error: FailedImport,
  timeout: 60000
})
