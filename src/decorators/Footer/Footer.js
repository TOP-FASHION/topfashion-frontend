import React, { Component } from 'react'
import {injectIntl} from 'react-intl'
import Fragment from '../../components/Fragment'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import setMessages from '../../utils/setMessages'
import messages from './Footer.messages.js'
import './Footer.scss'

class Footer extends Component {
  messages = setMessages(this, messages, 'app.footer.')

  render() {
    return (
      <Fragment>
        <div className="footer">
          <Container maxWidth="md">
            <Grid className="site-footer__widgets" container item xs={12} spacing={3}>
              <Grid item xs={4}>
                <div className="footer__widget footer-contacts">
                  <h5 className="footer-contacts__title">
                    {this.messages('contacts.title')}
                  </h5>
                  <div className="footer-contacts__text">
                    {this.messages('contacts.text')}
                  </div>
                  <ul className="footer-contacts__contacts">
                    <li>
                      <i className="footer-contacts__icon fas fa-globe-americas">
                        {this.messages('contacts.address')}
                      </i>
                    </li>
                    <li>
                      <i className="footer-contacts__icon far fa-envelope">
                        {this.messages('contacts.email')}
                      </i>
                    </li>
                    <li>
                      <i className="footer-contacts__icon fas fa-mobile-alt">
                        {this.messages('contacts.phone')}
                      </i>
                    </li>
                    <li>
                      <i className="footer-contacts__icon far fa-clock">
                        {this.messages('contacts.time')}
                      </i>
                    </li>
                  </ul>
                </div>
              </Grid>
              <Grid item xs={2}>
                <div className="site-footer__widget footer-links">
                  <h5 className="footer-links__title">
                    {this.messages('information.title')}
                  </h5>
                  <ul className="footer-links__list">
                    <li className="footer-links__item">
                      <a href="#" className="footer-links__link">
                        {this.messages('information.aboutUs')}
                      </a>
                    </li>
                    <li className="footer-links__item">
                      <a href="#" className="footer-links__link">
                        {this.messages('information.delivery')}
                      </a>
                    </li>
                    <li className="footer-links__item">
                      <a href="#" className="footer-links__link">
                        {this.messages('information.information')}
                      </a>
                    </li>
                    <li className="footer-links__item">
                      <a href="#" className="footer-links__link">
                        {this.messages('information.policy')}
                      </a>
                    </li>
                    <li className="footer-links__item">
                      <a href="#" className="footer-links__link">
                        {this.messages('information.brands')}
                      </a>
                    </li>
                    <li className="footer-links__item">
                      <a href="#" className="footer-links__link">
                        {this.messages('information.contactUs')}
                      </a>
                    </li>
                    <li className="footer-links__item">
                      <a href="#" className="footer-links__link">
                        {this.messages('information.returns')}
                      </a>
                    </li>
                    <li className="footer-links__item">
                      <a href="#" className="footer-links__link">
                        {this.messages('information.siteMap')}
                      </a>
                    </li>
                  </ul>
                </div>
              </Grid>
              <Grid item xs={2}>
                <div className="site-footer__widget footer-links">
                  <h5 className="footer-links__title">
                    {this.messages('myAccount.title')}
                  </h5>
                  <ul className="footer-links__list">
                    <li className="footer-links__item">
                      <a href="#" className="footer-links__link">
                        {this.messages('myAccount.storeLocation')}
                      </a>
                    </li>
                    <li className="footer-links__item">
                      <a href="#" className="footer-links__link">
                        {this.messages('myAccount.orderHistory')}
                      </a>
                    </li>
                    <li className="footer-links__item">
                      <a href="#" className="footer-links__link">
                        {this.messages('myAccount.wishList')}
                      </a>
                    </li>
                    <li className="footer-links__item">
                      <a href="#" className="footer-links__link">
                        {this.messages('myAccount.newsletter')}
                      </a>
                    </li>
                    <li className="footer-links__item">
                      <a href="#" className="footer-links__link">
                        {this.messages('myAccount.specials')}
                      </a>
                    </li>
                    <li className="footer-links__item">
                      <a href="#" className="footer-links__link">
                        {this.messages('myAccount.certificates')}
                      </a>
                    </li>
                    <li className="footer-links__item">
                      <a href="#" className="footer-links__link">
                        {this.messages('myAccount.affiliate')}
                      </a>
                    </li>
                  </ul>
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className="site-footer__widget footer-newsletter">
                  <h5 className="footer-newsletter__title">
                    {this.messages('newsletter.title')}
                  </h5>
                  <div className="footer-newsletter__text">
                    {this.messages('newsletter.text')}
                  </div>
                  {/*      <form action="#" className="footer-newsletter__form">
                    <label className="sr-only" htmlFor="footer-newsletter-address">Email Address</label>
                    <input type="text" className="footer-newsletter__form-input form-control" id="footer-newsletter-address" placeholder="Email Address...">
                    <button className="footer-newsletter__form-button btn btn-primary">Subscribe</button>
                  </form>*/}
                  <div className="footer-newsletter__text footer-newsletter__text--social">
                    {this.messages('newsletter.social')}
                  </div>
                  <ul className="footer-newsletter__social-links">
                    <li className="footer-newsletter__social-link footer-newsletter__social-link--facebook">
                      <a
                        href="https://themeforest.net/user/kos9"
                        target="_blank"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li className="footer-newsletter__social-link footer-newsletter__social-link--twitter">
                      <a
                        href="https://themeforest.net/user/kos9"
                        target="_blank"
                      >
                        <i className="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li className="footer-newsletter__social-link footer-newsletter__social-link--youtube">
                      <a
                        href="https://themeforest.net/user/kos9"
                        target="_blank"
                      >
                        <i className="fab fa-youtube"></i>
                      </a>
                    </li>
                    <li className="footer-newsletter__social-link footer-newsletter__social-link--instagram">
                      <a
                        href="https://themeforest.net/user/kos9"
                        target="_blank"
                      >
                        <i className="fab fa-instagram"></i>
                      </a>
                    </li>
                    <li className="footer-newsletter__social-link footer-newsletter__social-link--rss">
                      <a
                        href="https://themeforest.net/user/kos9"
                        target="_blank"
                      >
                        <i className="fas fa-rss"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </Grid>
            </Grid>
            <Grid className="site-footer__bottom" container item xs={12} spacing={3}>
              <Grid item xs={6}>
                <div className="site-footer__copyright">
                  <a href="templatespoint.net" target="_blank">
                    Templates Point
                  </a>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="site-footer__payments">
                  <img src="images/payments.png" alt="" />
                </div>
              </Grid>
            </Grid>
          </Container>
        </div>
      </Fragment>
    )
  }
}

export default injectIntl(Footer)
