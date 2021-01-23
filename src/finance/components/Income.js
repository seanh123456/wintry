import React from 'react'
import { connect } from 'react-redux'
import {
  financeEditEntry, financeDisplayEntry, financeEnterEntry,
} from '../actions/income'

class Income extends React.Component {
  render() {
    const {
      taxable,
      nonTaxable,
      capitalGains,
      healthcare,
      emplHsa,
      emplT401k,
      t401k,
    } = this.props

    const handleBlur = (event) => {
      if (event.key === 'Enter') {
        event.target.blur()
      }
    }

    let taxableInput
    let nonTaxableInput
    let capitalGainsInput
    let healthcareInput
    let emplHsaInput
    let emplT401kInput
    let t401kInput

    return (
    <table className="financial">
      <tbody>
        <tr className="table_header">
          <th>Income</th>
          <th>Annual</th>
          <th>Monthly</th>
          <th>Paycheck</th>
        </tr>
        <tr className="income">
          <th>Taxable:</th>
          <td className="editable"><input
            name="taxable"
            type="text"
            autoComplete="off"
            ref={node => (taxableInput = node)}
            value={taxable.editing ? taxable.entry : taxable.annual}
            onKeyPress={handleBlur}
            onChange={event => this.props.financeEnterEntry(event.target.name, taxableInput.value)}
            onFocus={event => this.props.financeEditEntry(event.target.name)}
            onBlur={event => this.props.financeDisplayEntry(event.target.name)}
          /></td>
          <td>{taxable.monthly}</td>
          <td>{taxable.paycheck}</td>
        </tr>
        <tr className="income">
          <th>Non Taxable:</th>
          <td className="editable"><input
            name="nonTaxable"
            type="text"
            autoComplete="off"
            ref={node => (nonTaxableInput = node)}
            value={nonTaxable.editing ? nonTaxable.entry : nonTaxable.annual}
            onKeyPress={handleBlur}
            onChange={event => this.props.financeEnterEntry(event.target.name, nonTaxableInput.value)}
            onFocus={event => this.props.financeEditEntry(event.target.name)}
            onBlur={event => this.props.financeDisplayEntry(event.target.name)}
          /></td>
          <td>{nonTaxable.monthly}</td>
          <td>{nonTaxable.paycheck}</td>
        </tr>
        <tr className="income">
          <th>Capital Gains:</th>
          <td className="editable"><input
            name="capitalGains"
            type="text"
            autoComplete="off"
            ref={node => (capitalGainsInput = node)}
            value={capitalGains.editing ? capitalGains.entry : capitalGains.annual}
            onKeyPress={handleBlur}
            onChange={event => this.props.financeEnterEntry(event.target.name, capitalGainsInput.value)}
            onFocus={event => this.props.financeEditEntry(event.target.name)}
            onBlur={event => this.props.financeDisplayEntry(event.target.name)}
          /></td>
          <td>{capitalGains.monthly}</td>
          <td>{capitalGains.paycheck}</td>
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
      </tbody>
    </table>
    )
  }
}

const mapStateToProps = state => ({
  taxable: state.finance.income.taxable,
  nonTaxable: state.finance.income.nonTaxable,
  capitalGains: state.finance.income.capitalGains,
  healthcare: state.finance.income.healthcare,
  emplHsa: state.finance.income.emplHsa,
  emplT401k: state.finance.income.emplT401k,
  t401k: state.finance.income.t401k,
})
const mapDispatchToProps = (dispatch, props) => ({
  financeEditEntry: name => { dispatch(financeEditEntry(name)) },
  financeEnterEntry: (name, value) => { dispatch(financeEnterEntry(name, value)) },
  financeDisplayEntry: name => { dispatch(financeDisplayEntry(name)) },
})

export default connect(mapStateToProps, mapDispatchToProps) (Income)
