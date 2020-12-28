import React from 'react'
import { connect } from 'react-redux'
import {
  financeEnterIncome, financeEditIncome, financeDisplayIncome,
  financeEnterHealthcare, financeEditHealthcare, financeDisplayHealthcare,
  financeEnterHsa, financeEditHsa, financeDisplayHsa,
} from '../actions/income'

class Income extends React.Component {
  render() {
    const {
      income1,
      gIncome,
      nIncome,
      healthcare,
      hsa,
    } = this.props

    const blur = (event) => {
      if (event.key === 'Enter') {
        event.target.blur()
      }
    }

        let income1Input
        let healthcareInput
        let hsaInput

    return (
      <table className="financial">
        <tbody>
          <tr className="income">
            <th><label htmlFor="income1">Income 1:</label></th>
            <td className="editable"><input
              id="income1"
              type="text"
              className={income1.class}
              autoComplete="off"
              ref={node => (income1Input = node)}
              value={income1.editing ? income1.entry : income1.display}
              onKeyPress={blur}
              onChange={() => this.props.dispatch(financeEnterIncome(income1Input.value))}
              onFocus={() => this.props.dispatch(financeEditIncome(income1Input.value))}
              onBlur={() => this.props.dispatch(financeDisplayIncome())}
            /></td>
          </tr>
          <tr className="income">
            <th><label htmlFor="gIncome">Gross Income:</label></th>
            <td><input
              id="gIncome"
              type="text"
              className={gIncome.class}
              value={gIncome.display}
              readOnly
            /></td>
          </tr>
          <tr className="health">
            <th><label htmlFor="healthcare">Healthcare:</label></th>
            <td className="editable"><input
              id="healthcare"
              type="text"
              className={healthcare.class}
              autoComplete="off"
              ref={node => (healthcareInput = node)}
              value={healthcare.editing ? healthcare.entry : healthcare.display}
              onKeyPress={blur}
              onChange={() => this.props.dispatch(financeEnterHealthcare(healthcareInput.value))}
              onFocus={() => this.props.dispatch(financeEditHealthcare(healthcareInput.value))}
              onBlur={() => this.props.dispatch(financeDisplayHealthcare())}
            /></td>
          </tr>
          <tr className="health">
            <th><label htmlFor="hsa">HSA:</label></th>
            <td className="editable"><input
              id="hsa"
              type="text"
              className={hsa.class}
              autoComplete="off"
              ref={node => (hsaInput = node)}
              value={hsa.editing ? hsa.entry : hsa.display}
              onKeyPress={blur}
              onChange={() => this.props.dispatch(financeEnterHsa(hsaInput.value))}
              onFocus={() => this.props.dispatch(financeEditHsa(hsaInput.value))}
              onBlur={() => this.props.dispatch(financeDisplayHsa())}
            /></td>
          </tr>
          <tr className="total-tax">
            <th><label htmlFor="nIncome">Net Income:</label></th>
            <td><input
              id="nIncome"
              type="text"
              className={nIncome.class}
              value={nIncome.display}
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
  nIncome: state.finance.income.nIncome,
  healthcare: state.finance.income.healthcare,
  hsa: state.finance.income.hsa,
})

export default connect(mapStateToProps) (Income)
