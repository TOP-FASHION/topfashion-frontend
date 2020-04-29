import React from 'react';
import { Modal } from 'react-bootstrap';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { injectIntl } from 'react-intl';
import { AppContext } from '../../../core/Store/context';
import LoginForm from '../../forms/LoginForm';
import RegistrationForm from '../../forms/RegistrationForm';
import Fragment from '../../../components/Fragment';
import messages from './LoginModal.messages';
import setMessages from '../../../utils/setMessages';
import './LoginModal.scss';

const LoginModal = observer((props: any) => {
  const { modalStore } = React.useContext(AppContext);
  const [currentTab, setCurrentTab] = React.useState('login');
  const message = setMessages(props, messages, 'modals.login.');

  const setTab = (newTab: any) => {
    setCurrentTab(newTab);
  };
  const tabs = [
    { key: 'login', title: message('title') },
    { key: 'registration', title: message('signUp') },
  ];

  const tabsButtons = tabs.map((tab) => {
    const classes = classNames('modal-title__item', {
      'modal-title__item--active': currentTab === tab.key,
    });

    return (
      <span key={tab.key} onClick={() => setTab(tab.key)} className={classes}>
        {tab.title}
      </span>
    );
  });

  return (
    <Modal
      centered
      className="login-modal"
      show={modalStore.openModalLogin}
      onHide={modalStore.closeLogin}
    >
      <Modal.Header className="text-center" closeButton>
        <Modal.Title className="modal-title w-100">{tabsButtons}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Fragment hidden={currentTab === 'registration'}>
          <LoginForm />
        </Fragment>
        <Fragment hidden={currentTab === 'login'}>
          <RegistrationForm />
        </Fragment>
      </Modal.Body>
    </Modal>
  );
});

export default injectIntl(LoginModal);
