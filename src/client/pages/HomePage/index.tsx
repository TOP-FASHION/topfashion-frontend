import universal from 'react-universal-component'
import Loading from '../../components/Loading/Loading'
import FailedImport from '../../containers/shared/FailedImport'

export default universal(() => import('./HomePage'), {
  loading: Loading,
  error: FailedImport,
  timeout: 60000
})
