import React from 'react'
import { connect } from 'react-redux'
import { financeUpdateIncome, financeEditIncome, financeFormatIncome } from '../actions/income'

class Income extends React.Component {
  render() {
    const {
      income1,
      gIncome,
      nIncome,
    } = this.props

    const blur = (event) => {
      if (event.key === 'Enter') {
        event.target.blur()
      }
    }

    let input

    return (
      <table className="financial">
        <tbody>
          <tr className="income">
            <th><label htmlFor="income1">Income 1:</label></th>
            <td className="editable"><input
              id="income1"
              type="text"
              className={income1.class}
              ref={node => (input = node)}
              value={income1.val}
              onKeyPress={blur}
              onChange={() => this.props.dispatch(financeUpdateIncome(input.value))}
              onFocus={(e) => this.props.dispatch(financeEditIncome(input.value))}
              onBlur={() => this.props.dispatch(financeFormatIncome(input.value))}
            /></td>
          </tr>
          <tr className="income">
            <th><label htmlFor="gIncome" >Gross Income:</label></th>
            <td><input
              id="gIncome"
              type="text"
              className={gIncome.class}
              value={gIncome.val}
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
    )
  }
}

const mapStateToProps = state => ({
  income1: state.finance.income.income1,
  gIncome: state.finance.income.gIncome,
  nIncome: state.finance.income.nIncome
})

export default connect(mapStateToProps) (Income)
