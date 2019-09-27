import React, {Component} from 'react'
import {injectIntl} from 'react-intl'
import {setApiErrors} from '../../translations/apiErrors.messages'
import {setFieldNames} from '../../translations/fieldNames.messages'
import messages from './RegistrationForm.messages'
import Fragment from '@finnplay/ui/Fragment'
import Group from '@finnplay/ui/Group'
import UniversalField from '../UniversalField'
import Notification from '@finnplay/ui/Notification'
import Button from '@finnplay/ui/Button'
import SelectItem from '@finnplay/ui/SelectItem'
import Stepper from '@finnplay/ui/Stepper'
import {$} from '@finnplay/ui'
import setMessages from '@finnplay/core/utils/setMessages'
import Markdown from '@finnplay/ui/Markdown'
import Link from '../Link'
import {CircularProgress} from 'material-ui/Progress'
import {when} from '@finnplay/core'
import Grid from '@finnplay/ui/Grid'
import GridItem from '@finnplay/ui/GridItem'
import PropTypes from 'prop-types'
import {Route, Switch} from 'react-router-dom'
import CenterContent from '../CenterContent'
import {properties} from '@finnplay/core/utils/Data'
import Cnp from '@finnplay/core/utils/Cnp'
import getValidatorByFieldId from '@finnplay/core/utils/getValidatorByFieldId'
import ApiError from '@finnplay/core/utils/Api/ApiError'

class RegistrationForm extends Component {
  messages = setMessages(this, messages, 'app.form.registration.')
  apiErrors = setApiErrors(this)
  fieldNames = setFieldNames(this)
  static propTypes = {
    className: PropTypes.string
  }
  onDisagree (props) {
    const isModal = props.location.search
    const url = isModal ? props.location.pathname : '/'
    props.history.push(url)
  }
  render () {
    return (
      <Group className={this.props.className}>
        <Fragment
          onInit={$(c => () => {
            const uiCollection = c.item('ui')
            if (!uiCollection.item('registration')) {
              uiCollection.setItems({
                registration: {
                  currentStepIndex: 0
                }
              })
            }
          })}
          onUninit={$(c => () => c.item('registration').item('register').callError(''))}
        >
          <Grid justify='center'>
            <GridItem xs={12}>
              {$(c => {
                // Notification shouldn't be floatable for blacklisted error (errorCode: 108)
                const errorCode = (c.item('registration').item('register').getError() || {}).errorCode
                return (
                  <Notification type='error' float={errorCode !== 108} autoHide>
                    {this.apiErrors(c.item('registration').item('register').getError())}
                  </Notification>
                )
              })}
            </GridItem>
          </Grid>

          <Fragment hidden={$(c => !!c.item('registration').item('register').getError())}>

            {/* Banner */}
            <Grid className='registration-form__banner'>
              <div className='registration-form__banner-promo'>
                <Markdown text={this.messages('promo')} />
              </div>
            </Grid>

            {/* information text */}
            <Grid className='registration-form__info'>
              <GridItem xs={12}>
                <Markdown text={this.messages('info')} />
              </GridItem>
            </Grid>

            {/* Stepper */}
            <Grid className='registration-form__stepper'>
              <GridItem xs={12}>
                <Stepper index={$(c => c.item('ui').item('registration').item('currentStepIndex'))} MuiStepLabelProps={{classes: {root: 'stepper-item', completed: 'stepper-item--completed'}}}>
                  {this.messages('step1')}
                  {this.messages('step2')}
                  {this.messages('step3')}
                </Stepper>
              </GridItem>
            </Grid>

            {/* Main */}
            {$(c => !c.item('registration').item('register').callSuccess() && c.item('ui').item('registration').item('currentStepIndex') < 2 ? (
              /* Show fields */
              <Fragment>
                {/* Notifications */}
                <Notification
                  float
                  autoHide
                  type='error'
                  onClose={$(c => () => c.item('registration').item('register').callError(''))}>
                  {$(c => this.apiErrors(c.item('registration').item('register').callError()))}
                </Notification>
                {$(c => c.item('registration').item('register').getLoading() ? <CenterContent><CircularProgress /></CenterContent> : (
                  <Fragment>
                    {/* Fields */}
                    <Grid key='registrationFormGroup' className='fields-container'>
                      {$(c => {
                        const currentStepIndex = c.item('ui').item('registration').item('currentStepIndex')
                        const fields = c.item('registration').item('register').keys()
                        // Set as mandatory the field  nationalIdNumber for Romania
                        if (~fields.indexOf('nationalIdNumber')) {
                          if (c.item('registration').item('register').item('country') !== 'ROU') {
                            c.item('registration').item('register').set('nationalIdNumber', properties({
                              validator: (value, params) => {
                                return getValidatorByFieldId('nationalIdNumber')(value, c.item('registration').item('register'), c, params)
                              },
                              metadata: {mandatory: true}
                            }))
                          } else {
                            c.item('registration').item('register').set('nationalIdNumber', properties({
                              validator: (value, params) => {
                                if (!value) {
                                  return new ApiError({
                                    error: 'required',
                                    errorDetails: {name: 'nationalIdNumber'}
                                  })
                                }
                                return getValidatorByFieldId('nationalIdNumber')(value, c.item('registration').item('register'), c, params)
                              },
                              metadata: {mandatory: true}
                            }))
                          }
                        }
                        return fields.map(fieldId => {
                          const firstStepFieldsList = c.item('settings').item('fe').item('registration.firstStepFields').items()
                          const isRelatedToFirstStep = !!~firstStepFieldsList.indexOf(fieldId) && currentStepIndex === 0
                          const isRelatedToSecondStep = !~firstStepFieldsList.indexOf(fieldId) && currentStepIndex !== 0
                          const placeholderElement = (
                            <Fragment
                              key={`fp-${fieldId}`}
                              onInit={$(c => () => c.item('registration').item('register').disableValidation(fieldId))}
                            />
                          )
                          const fieldElement = (
                            <GridItem className={`fields-container__grid-root--${fieldId}${' fields-container__grid-root fields-container__grid-root--selected-country-' + c.item('registration').item('register').item('country')}`} xs={12} sm={6}>
                              <Group
                                key={`fg-${fieldId}`}
                                classNames={{root: 'group-root__' + fieldId}}
                                onInit={$(c => () => c.item('registration').item('register').enableValidation(fieldId))}>
                                {$(c => fieldId === 'campaignId' && !c.item('registration').item('currentCampaigns').size ? null : (
                                  <UniversalField
                                    name={fieldId}
                                    type={fieldId}
                                    hint={fieldId === 'password' ? this.messages('hint.password') : ''}
                                    required={$(c => c.item('registration').item('register').getItem(fieldId, 'metadata').mandatory)}
                                    error={$(c => c.item('registration').item('register').itemError(fieldId))}
                                    value={$(c => c.item('registration').item('register').item(fieldId))}
                                    onChange={$(c => v => {
                                      c.item('registration').item('register').item(fieldId, v)
                                      // Check CNP for Romania
                                      if (v && fieldId === 'nationalIdNumber') {
                                        if (c.item('registration').item('register').item('country') === 'ROU') {
                                          const cnp = new Cnp(v)
                                          if (cnp.validate()) {
                                            if (~fields.indexOf('birthDate')) {
                                              c.item('registration').item('register').item('birthDate', cnp.getFullDate())
                                            }
                                            if (~fields.indexOf('gender')) {
                                              c.item('registration').item('register').item('gender', cnp.getGender())
                                            }
                                          } else {
                                            c.item('registration').item('register').reset('birthDate')
                                          }
                                        }
                                      }
                                    })}
                                    onInit={$(c => () => c.item('registration').item('register').error(fieldId, ''))}>
                                    {$(c => fieldId !== 'campaignId' ? undefined : [
                                      c.item('registration').item('currentCampaigns').items(campaign => {
                                        return !campaign.item('promoCode') ? (
                                          <SelectItem key={`cmp-${campaign.item('campaignId')}`} value={campaign.item('campaignId')}>
                                            {campaign.item('title')}
                                          </SelectItem>
                                        ) : (
                                          <SelectItem key='cmp-0' value={0}>
                                            {this.fieldNames('promoCode')}
                                          </SelectItem>
                                        )
                                      }),
                                      <SelectItem key='cmp--1' value={-1}>
                                        {this.messages('noCampaign')}
                                      </SelectItem>
                                    ])}
                                  </UniversalField>
                                ))}
                              </Group>
                            </GridItem>
                          )
                          return (
                            <Fragment key={`fw-${fieldId}`}>
                              {!isRelatedToFirstStep && !isRelatedToSecondStep ? placeholderElement : (
                                $(() => {
                                  if (fieldId === 'campaignId') {
                                    return (
                                      <Fragment>
                                        {$(c => {
                                          const hasCampaigns = !!c.item('registration').item('campaigns').size
                                          return !hasCampaigns ? placeholderElement : fieldElement
                                        })}
                                      </Fragment>
                                    )
                                  }
                                  if (fieldId === 'promoCode') {
                                    return (
                                      <Fragment>
                                        {$(c => {
                                          const hasCampaigns = !!c.item('registration').item('campaigns').size
                                          const displayPromoCode = c.item('registration').item('register').item('campaignId') === 0
                                          return !hasCampaigns || !displayPromoCode ? placeholderElement : fieldElement
                                        })}
                                      </Fragment>
                                    )
                                  }
                                  return fieldElement
                                })
                              )}
                            </Fragment>
                          )
                        })
                      })}
                    </Grid>
                    {/* Back */}
                    <Grid>
                      <GridItem className='text-center registration-form__gdpr-notification' xs={12}>
                        <Fragment>
                          {$(c => c.item('ui').item('registration').item('currentStepIndex') === 0 ? (
                            <Markdown text={this.messages('gdpr.notification')} />
                          ) : null)}
                        </Fragment>
                      </GridItem>
                      <GridItem className='text-center registration-form__buttons' xs={12}>
                        {/* Submit */}
                        <Button
                          className='button-primary'
                          loading={$(c => c.item('registration').item('register').callLoading())}
                          onClick={$(c => () => {
                            const registrationRegister = c.item('registration').item('register')
                            const step = c.item('ui').item('registration').item('currentStepIndex')
                            const submitWhenDisposer = c.item('ui').item('registration').item('submitWhenDisposer')
                            if (submitWhenDisposer) {
                              submitWhenDisposer()
                            }
                            if (step === 0) {
                              registrationRegister.validateCall()
                              const disposer = when(() => !registrationRegister.callValidating(), () => {
                                if (!registrationRegister.callError()) {
                                  c.item('ui').item('registration').item('currentStepIndex', 1)
                                  const modal = document.querySelector('.modal-contentRoot') || document.documentElement
                                  modal.scrollTop = 0
                                }
                              })
                              c.item('ui').item('registration').item('submitWhenDisposer', disposer)
                            } else {
                              registrationRegister.call()
                            }
                          })}>
                          {$(c => {
                            const step = c.item('ui').item('registration').item('currentStepIndex')
                            return this.messages(step !== 1 ? 'next' : 'register')
                          })}
                        </Button>

                        <Fragment>
                          {$(c => c.item('ui').item('registration').item('currentStepIndex') === 0 ? (
                            <Switch>
                              <Route component={props => (
                                <Button className='button-default' onClick={() => this.onDisagree(props)}>
                                  {this.messages('disagree')}
                                </Button>
                              )} />
                            </Switch>
                          ) : (
                            <Button className='button-default' onClick={$(c => () => {
                              c.item('registration').item('register').callError('')
                              c.item('ui').item('registration').item('currentStepIndex', 0)
                            })}>
                              {this.messages('back')}
                            </Button>
                          ))}
                        </Fragment>
                      </GridItem>
                    </Grid>
                  </Fragment>
                ))}
              </Fragment>
            ) : (
              /* Show successful message */
              <Grid className='registration-form__successful'>
                <Group
                  key='successfulMessageGroup'
                  onInit={$(c => () => c.item('ui').item('registration').item('currentStepIndex', 2))}
                  onUninit={$(c => () => c.item('ui').item('registration').item('currentStepIndex', 0))}
                >
                  {$(c => {
                    const activationProcess = c.item('settings').item('be').item('activationProcess')
                    const verificationProcess = c.item('settings').item('be').item('verificationProcess')
                    let successMessage = 'success'
                    if (activationProcess === 'true') {
                      successMessage += '.activation'
                    } else if (verificationProcess === 'true') {
                      successMessage += '.verification'
                    }
                    return (
                      <Markdown text={this.messages(successMessage)} />
                    )
                  })}
                  <Group>
                    <Button
                      className='button-secondary'
                      MuiButtonProps={{component: props => <Link to='/' {...props} />}}
                      onClick={$(c => () => c.item('ui').item('openRegistrationModal', false))}>
                      {this.messages('proceed')}
                    </Button>
                  </Group>
                </Group>
              </Grid>
            ))}
          </Fragment>
        </Fragment>
      </Group>
    )
  }
}

export default injectIntl(RegistrationForm)
