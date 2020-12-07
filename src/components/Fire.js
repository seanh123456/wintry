import React from 'react'
import { connect } from 'react-redux'
import { fetchFireGreeting, fireUpdateIncome, fireEditIncome, fireFormatIncome } from '../actions/fire'

class Fire extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchFireGreeting())
  }

  render() {
    const {
      error,
      loading,
      greeting,
      income1,
      gIncome,
      effFTax,
      effSTax,
      effLTax,
      nIncome
    } = this.props

    let input
    var greet = <h3>Fire dashboard says: {greeting}</h3>

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
          <ul>
            <li>
              <label for="income1">Income 1:</label>
              <input
                id="income1"
                type="text"
                ref={node => (input = node)}
                value={income1}
                onChange={() => this.props.dispatch(fireUpdateIncome(input.value))}
                onFocus={() => this.props.dispatch(fireEditIncome(input.value))}
                onBlur={() => this.props.dispatch(fireFormatIncome(input.value))}
              />
            </li>
            <li>
              <label for="gIncome">Gross Income:</label>
              <input id="gIncome" type="text" value={gIncome} readOnly/>
            </li>
            <li>
              <label for="effFTax">Effective Federal Tax:</label>
              <input id="effFTax" type="text" value={effFTax} readOnly/>
            </li>
            <li>
              <label for="effSTax">Effective State Tax:</label>
              <input id="effSTax" type="text" value={effSTax} readOnly/>
            </li>
            <li>
              <label for="effLTax">Effective Local Tax:</label>
              <input id="effLTax" type="text" value={effLTax} readOnly/>
            </li>
            <li>
              <label for="nIncome">Net Income:</label>
              <input id="nIncome" type="text" value={nIncome} readOnly/>
            </li>
          </ul>
        </div>
      </header>
    )
  }
}

const mapStateToProps = state => ({
  greeting: state.fire.greeting,
  loading: state.fire.loading,
  error: state.fire.error,
  income1: state.fire.income1,
  gIncome: state.fire.gIncome,
  effFTax: state.fire.effFTax,
  effSTax: state.fire.effSTax,
  effLTax: state.fire.effLTax,
  nIncome: state.fire.nIncome
})

export default connect(mapStateToProps) (Fire)
