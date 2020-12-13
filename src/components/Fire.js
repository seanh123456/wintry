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
      effFITax,
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
          <table className="financial">
            <tbody>
              <tr className="income editable">
                <th><label htmlFor="income1">Income 1:</label></th>
                <td><input
                  id="income1"
                  type="text"
                  className={income1.class}
                  ref={node => (input = node)}
                  value={income1.val}
                  onChange={() => this.props.dispatch(fireUpdateIncome(input.value))}
                  onFocus={() => this.props.dispatch(fireEditIncome(input.value))}
                  onBlur={() => this.props.dispatch(fireFormatIncome(input.value))}
                /></td>
              </tr>
              <tr className="income">
                <th><label htmlFor="gIncome" >Gross Income:</label></th>
                <td><input
                  id="gIncome"
                  type="text"
                  className={gIncome.class}
                  value={gIncome.val} readOnly
                /></td>
              </tr>
              <tr className="fica">
                <th><label htmlFor="effFITax">Effective FICA Tax:</label></th>
                <td><input
                  id="effFITax"
                  type="text"
                  className={effFITax.class}
                  value={effFITax.val}
                  readOnly
                /></td>
              </tr>
              <tr className="federal">
                <th><label htmlFor="effFTax">Effective Federal Tax:</label></th>
                <td><input
                  id="effFTax"
                  type="text"
                  className={effFTax.class}
                  value={effFTax.val}
                  readOnly
                /></td>
              </tr>
              <tr className="state">
                <th><label htmlFor="effSTax">Effective State Tax:</label></th>
                <td><input
                  id="effSTax"
                  type="text"
                  className={effSTax.class}
                  value={effSTax.val}
                  readOnly
                /></td>
              </tr>
              <tr className="local">
                <th><label htmlFor="effLTax">Effective Local Tax:</label></th>
                <td><input
                  id="effLTax"
                  type="text"
                  className={effLTax.class}
                  value={effLTax.val}
                  readOnly
                /></td>
              </tr>
              <tr className="total-tax">
                <th><label htmlFor="nIncome">Net Income:</label></th>
                <td><input
                  id="nIncome"
                  type="text"
                  className={nIncome.class}
                  value={nIncome.val}
                  readOnly
                /></td>
              </tr>
            </tbody>
          </table>
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
  effFITax: state.fire.effFITax,
  effFTax: state.fire.effFTax,
  effSTax: state.fire.effSTax,
  effLTax: state.fire.effLTax,
  nIncome: state.fire.nIncome
})

export default connect(mapStateToProps) (Fire)
