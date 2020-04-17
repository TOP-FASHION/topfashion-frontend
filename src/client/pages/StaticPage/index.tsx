import universal from 'react-universal-component'
import Loading from '../../components/Loading/Loading'
import FailedImport from '../../containers/shared/FailedImport'
import { FunctionComponent } from 'react'

export default universal(() => import('./StaticPage'), {
  loading: Loading,
  error: FailedImport,
  timeout: 60000
}) as FunctionComponent<any>
