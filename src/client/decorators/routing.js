import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

export class SetLang extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    langList: PropTypes.arrayOf(PropTypes.string)
  }

  static childContextTypes = {
    langList: PropTypes.arrayOf(PropTypes.string)
  }

  getChildContext () {
    return {
      langList: this.langList
    }
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount () {
    this.langList = this.props.langList
  }

  render () {
    this.langList = this.props.langList
    return this.props.children
  }
}

export class SwitchLang extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    langList: PropTypes.arrayOf(PropTypes.string)
  }

  static contextTypes = {
    langList: PropTypes.arrayOf(PropTypes.string)
  }

  static childContextTypes = {
    langList: PropTypes.arrayOf(PropTypes.string)
  }

  getChildContext () {
    return {
      langList: this.langList
    }
  }

  static getLangRout (lang, rout, key) {
    let path = rout.props.path || '/'
    if (path instanceof Array) {
      path = path.map((path = '/') => '/' + lang + (path === '/' ? '' : path))
    } else {
      path = '/' + lang + (path === '/' ? '' : path)
    }
    return React.cloneElement(rout, { ...rout.props, key, path })
  }

  rootConstructor () {
    this.langList = this.props.langList || []
    this.langSwitches = { '': <Switch>{this.props.children}</Switch> }
    this.langList.forEach(lang => { this.langSwitches[lang] = this.getLangSwitch(lang) })
    this.langRouts = this.props.langList.map((lang, key) => <Route key={key} path={'/' + lang} render={() => this.useLang(lang)} />)
    this.langRouts.push(<Route key={this.props.langList.length} path={'/'} render={() => this.useLang('')} />)
  }

  childConstructor () {
    this.langList = this.context.langList
    if (this.props.langList) {
      this.langList = this.langList.filter(val => this.props.langList.indexOf(val) !== -1)
    }
    this.langRouts = []
    const children = React.Children.toArray(this.props.children)
    const routsLength = children.length
    this.langList.forEach((lang, i) => {
      children.forEach((rout, j) => {
        this.langRouts.push(this.constructor.getLangRout(lang, rout, routsLength * i + j))
      })
    })
    this.langRouts = this.langRouts.concat(this.props.children)
  }

  getLangSwitch (lang) {
    return <Switch>{React.Children.map(this.props.children, (rout, key) => this.constructor.getLangRout(lang, rout, key))}</Switch>
  }

  useLang (lang) {
    return this.langSwitches[lang]
  }

  render () {
    if (this.context.langList) {
      this.childConstructor()
    } else {
      this.rootConstructor()
    }
    return <Switch>{this.langRouts}</Switch>
  }
}
