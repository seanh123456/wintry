import React from 'react'
import { connect } from 'react-redux'
import {
  financeEditEntry, financeDisplayEntry, financeEnterEntry,
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
      tIra,
      rIra,
      brokerage,
      gComp,
      nComp,
      nTakeHome,
      savings,
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
    let tIraInput
    let rIraInput
    let brokerageInput

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
              onChange={event => this.props.financeEnterEntry(event.target.name, income1Input.value)}
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
              onChange={event => this.props.financeEnterEntry(event.target.name, healthcareInput.value)}
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
              onChange={event => this.props.financeEnterEntry(event.target.name, emplHsaInput.value)}
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
              onChange={event => this.props.financeEnterEntry(event.target.name, hsaInput.value)}
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
              onChange={event => this.props.financeEnterEntry(event.target.name, emplT401kInput.value)}
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
              onChange={event => this.props.financeEnterEntry(event.target.name, t401kInput.value)}
              onFocus={event => this.props.financeEditEntry(event.target.name)}
              onBlur={event => this.props.financeDisplayEntry(event.target.name)}
            /></td>
            <td>{t401k.monthly}</td>
            <td>{t401k.paycheck}</td>
          </tr>
          <tr className="trad_ira">
            <th>Trad IRA:</th>
            <td className="editable"><input
              name="tIra"
              type="text"
              autoComplete="off"
              ref={node => (tIraInput = node)}
              value={tIra.editing ? tIra.entry : tIra.annual}
              onKeyPress={handleBlur}
              onChange={event => this.props.financeEnterEntry(event.target.name, tIraInput.value)}
              onFocus={event => this.props.financeEditEntry(event.target.name)}
              onBlur={event => this.props.financeDisplayEntry(event.target.name)}
            /></td>
            <td>{tIra.monthly}</td>
            <td>{tIra.paycheck}</td>
          </tr>
          <tr className="roth_ira">
            <th>Roth IRA:</th>
            <td className="editable"><input
              name="rIra"
              type="text"
              autoComplete="off"
              ref={node => (rIraInput = node)}
              value={rIra.editing ? rIra.entry : rIra.annual}
              onKeyPress={handleBlur}
              onChange={event => this.props.financeEnterEntry(event.target.name, rIraInput.value)}
              onFocus={event => this.props.financeEditEntry(event.target.name)}
              onBlur={event => this.props.financeDisplayEntry(event.target.name)}
            /></td>
            <td>{rIra.monthly}</td>
            <td>{rIra.paycheck}</td>
          </tr>
          <tr className="brokerage">
            <th>Brokerage:</th>
            <td className="editable"><input
              name="brokerage"
              type="text"
              autoComplete="off"
              ref={node => (brokerageInput = node)}
              value={brokerage.editing ? brokerage.entry : brokerage.annual}
              onKeyPress={handleBlur}
              onChange={event => this.props.financeEnterEntry(event.target.name, brokerageInput.value)}
              onFocus={event => this.props.financeEditEntry(event.target.name)}
              onBlur={event => this.props.financeDisplayEntry(event.target.name)}
            /></td>
            <td>{brokerage.monthly}</td>
            <td>{brokerage.paycheck}</td>
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
          <tr className="gross_comp">
            <th>Gross Comp:</th>
            <td>{gComp.annual}</td>
            <td>{gComp.monthly}</td>
            <td>{gComp.paycheck}</td>
          </tr>
          <tr className="net_comp">
            <th>Net Comp:</th>
            <td>{nComp.annual}</td>
            <td>{nComp.monthly}</td>
            <td>{nComp.paycheck}</td>
          </tr>
          <tr className="net_take_home">
            <th>NTakeHome:</th>
            <td>{nTakeHome.annual}</td>
            <td>{nTakeHome.monthly}</td>
            <td>{nTakeHome.paycheck}</td>
          </tr>
          <tr className="savings">
            <th>Savings:</th>
            <td>{savings.annual}</td>
            <td>{savings.monthly}</td>
            <td>{savings.paycheck}</td>
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
  tIra: state.finance.income.tIra,
  rIra: state.finance.income.rIra,
  brokerage: state.finance.income.brokerage,
  gComp: state.finance.income.gComp,
  nComp: state.finance.income.nComp,
  nTakeHome: state.finance.income.nTakeHome,
  savings: state.finance.income.savings,
})
const mapDispatchToProps = (dispatch, props) => ({
  financeEditEntry: name => { dispatch(financeEditEntry(name)) },
  financeEnterEntry: (name, value) => { dispatch(financeEnterEntry(name, value)) },
  financeDisplayEntry: name => { dispatch(financeDisplayEntry(name)) },
})

export default connect(mapStateToProps, mapDispatchToProps) (Income)
