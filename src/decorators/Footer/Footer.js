import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { injectIntl } from 'react-intl'
import { Grid, Container, TextField, Button } from '@material-ui/core/'
import Fragment from '../../components/Fragment'
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
            <Grid
              className="site-footer__widgets"
              container
              item
              xs={12}
              spacing={3}
            >
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
                      <i className="footer-contacts__icon fas fa-globe-americas" />
                      {this.messages('contacts.address')}
                    </li>
                    <li>
                      <i className="footer-contacts__icon far fa-envelope" />
                      {this.messages('contacts.email')}
                    </li>
                    <li>
                      <i className="footer-contacts__icon fas fa-mobile-alt" />
                      {this.messages('contacts.phone')}
                    </li>
                    <li>
                      <i className="footer-contacts__icon far fa-clock" />
                      {this.messages('contacts.time')}
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
                      <Link to="/" className="footer-links__link">
                        {this.messages('information.aboutUs')}
                      </Link>
                    </li>
                    <li className="footer-links__item">
                      <Link to="/" className="footer-links__link">
                        {this.messages('information.delivery')}
                      </Link>
                    </li>
                    <li className="footer-links__item">
                      <Link to="#" className="footer-links__link">
                        {this.messages('information.information')}
                      </Link>
                    </li>
                    <li className="footer-links__item">
                      <Link to="#" className="footer-links__link">
                        {this.messages('information.policy')}
                      </Link>
                    </li>
                    <li className="footer-links__item">
                      <Link to="#" className="footer-links__link">
                        {this.messages('information.brands')}
                      </Link>
                    </li>
                    <li className="footer-links__item">
                      <Link to="#" className="footer-links__link">
                        {this.messages('information.contactUs')}
                      </Link>
                    </li>
                    <li className="footer-links__item">
                      <Link to="#" className="footer-links__link">
                        {this.messages('information.returns')}
                      </Link>
                    </li>
                    <li className="footer-links__item">
                      <Link to="#" className="footer-links__link">
                        {this.messages('information.siteMap')}
                      </Link>
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
                      <Link to="#" className="footer-links__link">
                        {this.messages('myAccount.storeLocation')}
                      </Link>
                    </li>
                    <li className="footer-links__item">
                      <Link to="#" className="footer-links__link">
                        {this.messages('myAccount.orderHistory')}
                      </Link>
                    </li>
                    <li className="footer-links__item">
                      <Link to="#" className="footer-links__link">
                        {this.messages('myAccount.wishList')}
                      </Link>
                    </li>
                    <li className="footer-links__item">
                      <Link to="#" className="footer-links__link">
                        {this.messages('myAccount.newsletter')}
                      </Link>
                    </li>
                    <li className="footer-links__item">
                      <Link to="#" className="footer-links__link">
                        {this.messages('myAccount.specials')}
                      </Link>
                    </li>
                    <li className="footer-links__item">
                      <Link to="#" className="footer-links__link">
                        {this.messages('myAccount.certificates')}
                      </Link>
                    </li>
                    <li className="footer-links__item">
                      <Link to="#" className="footer-links__link">
                        {this.messages('myAccount.affiliate')}
                      </Link>
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
                  <form action="#" className="footer-newsletter__form">
                    <label
                      className="sr-only"
                      htmlFor="footer-newsletter-address"
                    >
                      {this.messages('newsletter.email')}
                    </label>
                    <TextField
                      id="footer-newsletter-address"
                      label="With placeholder"
                      placeholder="Placeholder"
                      className="footer-newsletter__form-input form-control"
                      margin="normal"
                    />
                    <Button
                      variant="contained"
                      className="footer-newsletter__form-button btn btn-primary"
                    >
                      {this.messages('newsletter.subscribe')}
                    </Button>
                  </form>
                  <div className="footer-newsletter__text footer-newsletter__text--social">
                    {this.messages('newsletter.social')}
                  </div>
                  <ul className="footer-newsletter__social-links">
                    <li className="footer-newsletter__social-link footer-newsletter__social-link--facebook">
                      <Link to="/" target="_blank">
                        <i className="fab fa-facebook-f" />
                      </Link>
                    </li>
                    <li className="footer-newsletter__social-link footer-newsletter__social-link--twitter">
                      <Link to="/" target="_blank">
                        <i className="fab fa-twitter" />
                      </Link>
                    </li>
                    <li className="footer-newsletter__social-link footer-newsletter__social-link--youtube">
                      <Link to="/" target="_blank">
                        <i className="fab fa-youtube" />
                      </Link>
                    </li>
                    <li className="footer-newsletter__social-link footer-newsletter__social-link--instagram">
                      <Link to="/" target="_blank">
                        <i className="fab fa-instagram" />
                      </Link>
                    </li>
                    <li className="footer-newsletter__social-link footer-newsletter__social-link--rss">
                      <Link to="/" target="_blank">
                        <i className="fas fa-rss" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </Grid>
            </Grid>
            <Grid
              className="site-footer__bottom"
              container
              item
              xs={12}
              spacing={3}
            >
              <Grid item xs={6} className="site-footer__copyright">
                <Link to="/" target="_blank">
                  {this.messages('newsletter.templates')}
                </Link>
              </Grid>
              <Grid item xs={6} className="site-footer__payments">
                <img src="/static/img/payments.png" alt="" />
              </Grid>
            </Grid>
          </Container>
        </div>
      </Fragment>
    )
  }
}

export default injectIntl(Footer)
