import React from 'react'
import { connect } from 'react-redux'

class Tax extends React.Component {
  render() {
    const {
      ficaTax,
      federalTax,
      stateTax,
      localTax,
      totalTax,
    } = this.props

    return (
      <table className="financial">
        <tbody>
          <tr className="table_header">
            <th>Tax</th>
            <th>Annual</th>
            <th>Monthly</th>
            <th>Paycheck</th>
            <th className="effective">Effective</th>
            <th className="marginal">Marginal</th>
          </tr>
          <tr className="fica">
            <th>FICA Tax:</th>
            <td>{ficaTax.annual}</td>
            <td>{ficaTax.monthly}</td>
            <td>{ficaTax.paycheck}</td>
            <td className="effective">{ficaTax.effective}</td>
            <td className="marginal">{ficaTax.marginal}</td>
          </tr>
          <tr className="federal">
            <th>Federal Tax:</th>
            <td>{federalTax.annual}</td>
            <td>{federalTax.monthly}</td>
            <td>{federalTax.paycheck}</td>
            <td className="effective">{federalTax.effective}</td>
            <td className="marginal">{federalTax.marginal}</td>
          </tr>
          <tr className="state">
            <th>State Tax:</th>
            <td>{stateTax.annual}</td>
            <td>{stateTax.monthly}</td>
            <td>{stateTax.paycheck}</td>
            <td className="effective">{stateTax.effective}</td>
            <td className="marginal">{stateTax.marginal}</td>
          </tr>
          <tr className="local">
            <th>Local Tax:</th>
            <td>{localTax.annual}</td>
            <td>{localTax.monthly}</td>
            <td>{localTax.paycheck}</td>
            <td className="effective">{localTax.effective}</td>
            <td className="marginal">{localTax.marginal}</td>
          </tr>
          <tr className="total-tax">
            <th>Total Tax:</th>
            <td>{totalTax.annual}</td>
            <td>{totalTax.monthly}</td>
            <td>{totalTax.paycheck}</td>
            <td className="effective">{totalTax.effective}</td>
            <td className="marginal">{totalTax.marginal}</td>
          </tr>
        </tbody>
      </table>
    )
  }
}

const mapStateToProps = state => ({
  ficaTax: state.finance.tax.ficaTax,
  federalTax: state.finance.tax.federalTax,
  stateTax: state.finance.tax.stateTax,
  localTax: state.finance.tax.localTax,
  totalTax: state.finance.tax.totalTax,
})

export default connect(mapStateToProps) (Tax)
