import React from 'react'
import { connect } from 'react-redux'
import {
  financeEditEntry, financeDisplayEntry, financeEnterEntry,
} from '../actions/income'

class Deductions extends React.Component {
  render() {
    const {
      hsa,
      tIra,
      rIra,
      brokerage,
      atInsurance,
    } = this.props

    const handleBlur = (event) => {
      if (event.key === 'Enter') {
        event.target.blur()
      }
    }

    let hsaInput
    let tIraInput
    let rIraInput
    let brokerageInput
    let atInsuranceInput

    return (
      <table className="financial">
        <tbody>
          <tr className="table_header">
            <th>Deductions</th>
            <th>Annual</th>
            <th>Monthly</th>
            <th>Paycheck</th>
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
          <tr className="atInsurance">
            <th>AT Insurance:</th>
            <td className="editable"><input
              name="atInsurance"
              type="text"
              autoComplete="off"
              ref={node => (atInsuranceInput = node)}
              value={atInsurance.editing ? atInsurance.entry : atInsurance.annual}
              onKeyPress={handleBlur}
              onChange={event => this.props.financeEnterEntry(event.target.name, atInsuranceInput.value)}
              onFocus={event => this.props.financeEditEntry(event.target.name)}
              onBlur={event => this.props.financeDisplayEntry(event.target.name)}
            /></td>
            <td>{atInsurance.monthly}</td>
            <td>{atInsurance.paycheck}</td>
          </tr>
        </tbody>
      </table>
    )
  }
}

const mapStateToProps = state => ({
  hsa: state.finance.income.hsa,
  tIra: state.finance.income.tIra,
  rIra: state.finance.income.rIra,
  brokerage: state.finance.income.brokerage,
  atInsurance: state.finance.income.atInsurance,
})
const mapDispatchToProps = (dispatch, props) => ({
  financeEditEntry: name => { dispatch(financeEditEntry(name)) },
  financeEnterEntry: (name, value) => { dispatch(financeEnterEntry(name, value)) },
  financeDisplayEntry: name => { dispatch(financeDisplayEntry(name)) },
})

export default connect(mapStateToProps, mapDispatchToProps) (Deductions)
