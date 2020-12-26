import React from 'react'
import { connect } from 'react-redux'
import { fetchFinanceGreeting } from '../actions/finance'
import '../../scss/Finance.scss'

import Income from './Income'
import Tax from './Tax'

class Finance extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchFinanceGreeting())
  }

  render() {
    const {
      error,
      loading,
      greeting,
    } = this.props

    let input
    var greet = <h3>Finance dashboard says: {greeting}</h3>

    if (error) {
      greet = <h3>Error: {error.message}</h3>
    }

    if (loading) {
      greet = <h3>loading...</h3>
    }

    return (
      <header className="App-header">
        <div className="wrapper">
          {greet}
          <Income />
          <Tax />
        </div>
      </header>
    )
  }
}

const mapStateToProps = state => ({
  greeting: state.finance.finance.greeting,
  loading: state.finance.finance.loading,
  error: state.finance.finance.error,
})

export default connect(mapStateToProps) (Finance)
