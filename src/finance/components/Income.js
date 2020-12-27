import React from 'react'
import { connect } from 'react-redux'
import { financeEnterIncome, financeEditIncome, financeCalcIncome } from '../actions/income'

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

    let input = {
      income1: 0,
      healthcare: 0,
      hsa: 0,
    }

    return (
      <table className="financial">
        <tbody>
          <tr className="income">
            <th><label htmlFor="income1">Income 1:</label></th>
            <td className="editable"><input
              id="income1"
              type="text"
              className={income1.class}
              ref={node => (input.income1 = node.value)}
              value={income1.val}
              onKeyPress={blur}
              onChange={() => this.props.dispatch(financeEnterIncome(input))}
              onFocus={() => this.props.dispatch(financeEditIncome(input))}
              onBlur={() => this.props.dispatch(financeCalcIncome(input))}
            /></td>
          </tr>
          <tr className="income">
            <th><label htmlFor="gIncome">Gross Income:</label></th>
            <td><input
              id="gIncome"
              type="text"
              className={gIncome.class}
              value={gIncome.val}
              readOnly
            /></td>
          </tr>
          <tr className="healthcare">
            <th><label htmlFor="healthcare">Healthcare:</label></th>
            <td className="editable"><input
              id="healthcare"
              type="text"
              className={healthcare.class}
              ref={node => (input.healthcare = node.value)}
              value={healthcare.val}
              onKeyPress={blur}
              onChange={() => this.props.dispatch(financeEnterHealthcare(input))}
              onFocus={() => this.props.dispatch(financeEditHealthcare(input))}
              onBlur={() => this.props.dispatch(financeCalcHealthcare(input))}
            /></td>
          </tr>
          <tr className="hsa">
            <th><label htmlFor="hsa">HSA:</label></th>
            <td className="editable"><input
              id="hsa"
              type="text"
              className={hsa.class}
              ref={node => (input.hsa = node.value)}
              value={hsa.val}
              onKeyPress={blur}
              onChange={() => this.props.dispatch(financeEnterHSA(input))}
              onFocus={() => this.props.dispatch(financeEditHSA(input))}
              onBlur={() => this.props.dispatch(financeCalcHSA(input))}
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
