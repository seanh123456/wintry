import React from 'react'
import { connect } from 'react-redux'
import { fetchFinanceGreeting } from '../actions/finance'
import '../../scss/Finance.scss'

import Options from './Options'
import Income from './Income'
import Tax from './Tax'

class Finance extends React.Component {
  componentDidMount() {
    this.props.fetchFinanceGreeting()
  }

  render() {
    const {
      greeting,
      error,
      loading,
    } = this.props

    var greet = <h3>Finance dashboard says: {greeting}</h3>

    if (error) {
      greet = <h3>Error: {error.message}</h3>
    }

    if (loading) {
      greet = <h3>loading...</h3>
    }

    return (
      <div className="App-content">
        <section className="wrapper">
          <div>
            {greet}
            <Options />
          </div>
        </section>
        <section className="wrapper">
          <div className="financial-tables">
            <div className="financial-table">
              <Income />
            </div>
            <div className="financial-table">
              <Tax />
            </div>
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  greeting: state.finance.finance.greeting,
  loading: state.finance.finance.loading,
  error: state.finance.finance.error,
})
const mapDispatchToProps = (dispatch, props) => ({
  fetchFinanceGreeting: () => {dispatch(fetchFinanceGreeting())}
})

export default connect(mapStateToProps, mapDispatchToProps) (Finance)
