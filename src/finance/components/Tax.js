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
            <th>Effective</th>
            <th>Marginal</th>
          </tr>
          <tr className="fica">
            <th>FICA Tax:</th>
            <td>{ficaTax.annual}</td>
            <td>{ficaTax.monthly}</td>
            <td>{ficaTax.paycheck}</td>
            <td>{ficaTax.effective}</td>
            <td>{ficaTax.marginal}</td>
          </tr>
          <tr className="federal">
            <th>Federal Tax:</th>
            <td>{federalTax.annual}</td>
            <td>{federalTax.monthly}</td>
            <td>{federalTax.paycheck}</td>
            <td>{federalTax.effective}</td>
            <td>{federalTax.marginal}</td>
          </tr>
          <tr className="state">
            <th>State Tax:</th>
            <td>{stateTax.annual}</td>
            <td>{stateTax.monthly}</td>
            <td>{stateTax.paycheck}</td>
            <td>{stateTax.effective}</td>
            <td>{stateTax.marginal}</td>
          </tr>
          <tr className="local">
            <th>Local Tax:</th>
            <td>{localTax.annual}</td>
            <td>{localTax.monthly}</td>
            <td>{localTax.paycheck}</td>
            <td>{localTax.effective}</td>
            <td>{localTax.marginal}</td>
          </tr>
          <tr className="total-tax">
            <th>Total Tax:</th>
            <td>{totalTax.annual}</td>
            <td>{totalTax.monthly}</td>
            <td>{totalTax.paycheck}</td>
            <td>{totalTax.effective}</td>
            <td>{totalTax.marginal}</td>
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
