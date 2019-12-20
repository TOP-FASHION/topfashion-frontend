import React from 'react'
import { injectIntl } from 'react-intl'
import { Col, Container, Row } from 'reactstrap'
import FooterContacts from './FooterContacts'
import FooterLinks from './FooterLinks'
import FooterNewsletter from './FooterNewsletter'
// import setMessages from '../../utils/setMessages'
// import messages from './Footer.messages.js'
import './Footer.scss'

function Footer () {
  const informationLinks = [
    { title: 'About Us', url: '' },
    { title: 'Delivery Information', url: '' },
    { title: 'Privacy Policy', url: '' },
    { title: 'Brands', url: '' },
    { title: 'Contact Us', url: '' },
    { title: 'Returns', url: '' },
    { title: 'Site Map', url: '' }
  ]

  const accountLinks = [
    { title: 'Store Location', url: '' },
    { title: 'Order History', url: '' },
    { title: 'Wish List', url: '' },
    { title: 'Newsletter', url: '' },
    { title: 'Specials', url: '' },
    { title: 'Gift Certificates', url: '' },
    { title: 'Affiliate', url: '' }
  ]

  return (
    <div className='site-footer'>
      <Container>
        <div className='site-footer__widgets'>
          <Row>
            <Col xs='12' md='6' lg='4'>
              <FooterContacts />
            </Col>
            <Col xs='6' md='3' lg='2'>
              <FooterLinks title='Information' items={informationLinks} />
            </Col>
            <Col xs='6' md='3' lg='2'>
              <FooterLinks title='My Account' items={accountLinks} />
            </Col>
            <Col xs='12' md='12' lg='4'>
              <FooterNewsletter />
            </Col>
          </Row>
        </div>

        <div className='site-footer__bottom'>
          <div className='site-footer__copyright'>
            Powered by
            {' '}
            <a href='https://reactjs.org/' rel='noopener noreferrer' target='_blank'>React</a>
            {' '}
            — Design by
            {' '}
            <a href='/' target='_blank' rel='noopener noreferrer'>
              Me
            </a>
          </div>
          <div className='site-footer__payments'>
            <img src='/public/img/payments.png' alt='' />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default injectIntl(Footer)
