import React from 'react';
import { injectIntl } from 'react-intl';
import { observer } from 'mobx-react';
import { toast } from 'react-toastify';
import { AppContext } from '../../../core/Store/context';
import messages from './LoginNotification.messages';
import setMessages from '../../../utils/setMessages';
import Fragment from '../../../components/Fragment';

const LoginNotification = observer((props: any) => {
  const { loginStore } = React.useContext(AppContext);
  const message = setMessages(
    props,
    messages,
    'app.globalNotification.login.status.'
  );

  const statusTypes: any = {
    error: 'error',
    ok: 'success',
  };

  const notify = (text: any) => {
    toast(
      message(statusTypes[loginStore.statusLogin], {
        error: text,
      }),
      {
        type: statusTypes[loginStore.statusLogin] || 'default',
        position: toast.POSITION.TOP_RIGHT,
        onClose: () => loginStore.clear(),
      }
    );
  };

  return loginStore.statusLogin ? (
    <Fragment>{notify(loginStore.messageStatusLogin)}</Fragment>
  ) : null;
});

export default injectIntl(LoginNotification);
