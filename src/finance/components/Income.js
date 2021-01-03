import React from 'react'
import { connect } from 'react-redux'
import {
  financeEditEntry, financeDisplayEntry,
  financeEnterIncome, financeEnterHealthcare, financeEnterEmplHsa,
  financeEnterHsa, financeEnterEmplT401k, financeEnterT401k,
} from '../actions/income'

class Income extends React.Component {
  render() {
    const {
      income1,
      gIncome,
      nIncome,
      healthcare,
      emplHsa,
      hsa,
      emplT401k,
      t401k,
    } = this.props

    const handleBlur = (event) => {
      if (event.key === 'Enter') {
        event.target.blur()
      }
    }

    let income1Input
    let healthcareInput
    let emplHsaInput
    let hsaInput
    let emplT401kInput
    let t401kInput

    return (
      <table className="financial">
        <tbody>
          <tr className="table_header">
            <th></th>
            <th>Annual</th>
            <th>Monthly</th>
            <th>Paycheck</th>
          </tr>
          <tr className="income">
            <th>Income 1:</th>
            <td className="editable"><input
              name="income1"
              type="text"
              autoComplete="off"
              ref={node => (income1Input = node)}
              value={income1.editing ? income1.entry : income1.annual}
              onKeyPress={handleBlur}
              onChange={event => this.props.financeEnterIncome(event.target.name, income1Input.value)}
              onFocus={event => this.props.financeEditEntry(event.target.name)}
              onBlur={event => this.props.financeDisplayEntry(event.target.name)}
            /></td>
            <td>{income1.monthly}</td>
            <td>{income1.paycheck}</td>
          </tr>
          <tr className="health">
            <th>Healthcare:</th>
            <td className="editable"><input
              name="healthcare"
              type="text"
              autoComplete="off"
              ref={node => (healthcareInput = node)}
              value={healthcare.editing ? healthcare.entry : healthcare.annual}
              onKeyPress={handleBlur}
              onChange={event => this.props.financeEnterHealthcare(event.target.name, healthcareInput.value)}
              onFocus={event => this.props.financeEditEntry(event.target.name)}
              onBlur={event => this.props.financeDisplayEntry(event.target.name)}
            /></td>
            <td>{healthcare.monthly}</td>
            <td>{healthcare.paycheck}</td>
          </tr>
          <tr className="health">
            <th>Empl HSA:</th>
            <td className="editable"><input
              name="emplHsa"
              type="text"
              autoComplete="off"
              ref={node => (emplHsaInput = node)}
              value={emplHsa.editing ? emplHsa.entry : emplHsa.annual}
              onKeyPress={handleBlur}
              onChange={event => this.props.financeEnterEmplHsa(event.target.name, emplHsaInput.value)}
              onFocus={event => this.props.financeEditEntry(event.target.name)}
              onBlur={event => this.props.financeDisplayEntry(event.target.name)}
            /></td>
            <td>{emplHsa.monthly}</td>
            <td>{emplHsa.paycheck}</td>
          </tr>
          <tr className="health">
            <th>HSA:</th>
            <td className="editable"><input
              name="hsa"
              type="text"
              autoComplete="off"
              ref={node => (hsaInput = node)}
              value={hsa.editing ? hsa.entry : hsa.annual}
              onKeyPress={handleBlur}
              onChange={event => this.props.financeEnterHsa(event.target.name, hsaInput.value)}
              onFocus={event => this.props.financeEditEntry(event.target.name)}
              onBlur={event => this.props.financeDisplayEntry(event.target.name)}
            /></td>
            <td>{hsa.monthly}</td>
            <td>{hsa.paycheck}</td>
          </tr>
          <tr className="emp_ret">
            <th>Empl T 401k:</th>
            <td className="editable"><input
              name="emplT401k"
              type="text"
              autoComplete="off"
              ref={node => (emplT401kInput = node)}
              value={emplT401k.editing ? emplT401k.entry : emplT401k.annual}
              onKeyPress={handleBlur}
              onChange={event => this.props.financeEnterEmplT401k(event.target.name, emplT401kInput.value)}
              onFocus={event => this.props.financeEditEntry(event.target.name)}
              onBlur={event => this.props.financeDisplayEntry(event.target.name)}
            /></td>
            <td>{emplT401k.monthly}</td>
            <td>{emplT401k.paycheck}</td>
          </tr>
          <tr className="emp_ret">
            <th>Trad 401k:</th>
            <td className="editable"><input
              name="t401k"
              type="text"
              autoComplete="off"
              ref={node => (t401kInput = node)}
              value={t401k.editing ? t401k.entry : t401k.annual}
              onKeyPress={handleBlur}
              onChange={event => this.props.financeEnterT401k(event.target.name, t401kInput.value)}
              onFocus={event => this.props.financeEditEntry(event.target.name)}
              onBlur={event => this.props.financeDisplayEntry(event.target.name)}
            /></td>
            <td>{t401k.monthly}</td>
            <td>{t401k.paycheck}</td>
          </tr>
          <tr className="income">
            <th>G Income:</th>
            <td>{gIncome.annual}</td>
            <td>{gIncome.monthly}</td>
            <td>{gIncome.paycheck}</td>
          </tr>
          <tr className="net_income">
            <th>Net Income:</th>
            <td>{nIncome.annual}</td>
            <td>{nIncome.monthly}</td>
            <td>{nIncome.paycheck}</td>
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
  emplHsa: state.finance.income.emplHsa,
  hsa: state.finance.income.hsa,
  emplT401k: state.finance.income.emplT401k,
  t401k: state.finance.income.t401k,
})
const mapDispatchToProps = (dispatch, props) => ({
  financeEditEntry: name => { dispatch(financeEditEntry(name)) },
  // financeEnterEntry: (name, value) => { dispatch(financeEnterEntry(name, value)) },
  financeEnterIncome: (name, value) => { dispatch(financeEnterIncome(name, value)) },
  financeEnterHealthcare: (name, value) => { dispatch(financeEnterHealthcare(name, value)) },
  financeEnterEmplHsa: (name, value) => { dispatch(financeEnterEmplHsa(name, value)) },
  financeEnterHsa: (name, value) => { dispatch(financeEnterHsa(name, value)) },
  financeEnterEmplT401k: (name, value) => { dispatch(financeEnterEmplT401k(name, value)) },
  financeEnterT401k: (name, value) => { dispatch(financeEnterT401k(name, value)) },
  financeDisplayEntry: name => { dispatch(financeDisplayEntry(name)) },
})

export default connect(mapStateToProps, mapDispatchToProps) (Income)
