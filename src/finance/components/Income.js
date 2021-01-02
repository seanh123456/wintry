import React from 'react'
import { connect } from 'react-redux'
import {
  financeEditEntry, financeDisplayEntry,
  financeEnterIncome, financeEnterHealthcare, financeEnterHsa, financeEnterT401k,
} from '../actions/income'

class Income extends React.Component {
  render() {
    const {
      income1,
      gIncome,
      nIncome,
      healthcare,
      hsa,
      t401k,
    } = this.props

    const handleBlur = (event) => {
      if (event.key === 'Enter') {
        event.target.blur()
      }
    }

    let income1Input
    let healthcareInput
    let hsaInput
    let t401kInput

    return (
      <table className="financial">
        <tbody>
          <tr className="income">
            <th><label htmlFor="income1">Income 1:</label></th>
            <td className="editable"><input
              id="income1"
              name="income1"
              type="text"
              className={income1.class}
              autoComplete="off"
              ref={node => (income1Input = node)}
              value={income1.editing ? income1.entry : income1.display}
              onKeyPress={handleBlur}
              onChange={event => this.props.financeEnterIncome(event.target.name, income1Input.value)}
              onFocus={event => this.props.financeEditEntry(event.target.name)}
              onBlur={event => this.props.financeDisplayEntry(event.target.name)}
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
              name="healthcare"
              type="text"
              className={healthcare.class}
              autoComplete="off"
              ref={node => (healthcareInput = node)}
              value={healthcare.editing ? healthcare.entry : healthcare.display}
              onKeyPress={handleBlur}
              onChange={event => this.props.financeEnterHealthcare(event.target.name, healthcareInput.value)}
              onFocus={event => this.props.financeEditEntry(event.target.name)}
              onBlur={event => this.props.financeDisplayEntry(event.target.name)}
            /></td>
          </tr>
          <tr className="health">
            <th><label htmlFor="hsa">HSA:</label></th>
            <td className="editable"><input
              id="hsa"
              name="hsa"
              type="text"
              className={hsa.class}
              autoComplete="off"
              ref={node => (hsaInput = node)}
              value={hsa.editing ? hsa.entry : hsa.display}
              onKeyPress={handleBlur}
              onChange={event => this.props.financeEnterHsa(event.target.name, hsaInput.value)}
              onFocus={event => this.props.financeEditEntry(event.target.name)}
              onBlur={event => this.props.financeDisplayEntry(event.target.name)}
            /></td>
          </tr>
          <tr className="emp_ret">
            <th><label htmlFor="t401k">Traditional 401k:</label></th>
            <td className="editable"><input
              id="t401k"
              name="t401k"
              type="text"
              className={t401k.class}
              autoComplete="off"
              ref={node => (t401kInput = node)}
              value={t401k.editing ? t401k.entry : t401k.display}
              onKeyPress={handleBlur}
              onChange={event => this.props.financeEnterT401k(event.target.name, t401kInput.value)}
              onFocus={event => this.props.financeEditEntry(event.target.name)}
              onBlur={event => this.props.financeDisplayEntry(event.target.name)}
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
  t401k: state.finance.income.t401k,
})
const mapDispatchToProps = (dispatch, props) => ({
  financeEditEntry: name => { dispatch(financeEditEntry(name)) },
  // financeEnterEntry: (name, value) => { dispatch(financeEnterEntry(name, value)) },
  financeEnterIncome: (name, value) => { dispatch(financeEnterIncome(name, value)) },
  financeEnterHealthcare: (name, value) => { dispatch(financeEnterHealthcare(name, value)) },
  financeEnterHsa: (name, value) => { dispatch(financeEnterHsa(name, value)) },
  financeEnterT401k: (name, value) => { dispatch(financeEnterT401k(name, value)) },
  financeDisplayEntry: name => { dispatch(financeDisplayEntry(name)) },
})

export default connect(mapStateToProps, mapDispatchToProps) (Income)
