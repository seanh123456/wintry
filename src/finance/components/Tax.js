import React from 'react'
import { connect } from 'react-redux'

class Tax extends React.Component {
  render() {
    const {
      effFITax,
      effFTax,
      effSTax,
      effLTax,
      totalTax,
    } = this.props

    return (
      <table className="financial">
        <tbody>
          <tr className="fica">
            <th><label htmlFor="ficaTax">FICA Tax:</label></th>
            <td><input
              id="ficaTax"
              type="text"
              className={effFITax.class}
              value={effFITax.val}
              readOnly
            /></td>
          </tr>
          <tr className="federal">
            <th><label htmlFor="federalTax">Federal Tax:</label></th>
            <td><input
              id="federalTax"
              type="text"
              className={effFTax.class}
              value={effFTax.val}
              readOnly
            /></td>
          </tr>
          <tr className="state">
            <th><label htmlFor="stateTax">State Tax:</label></th>
            <td><input
              id="stateTax"
              type="text"
              className={effSTax.class}
              value={effSTax.val}
              readOnly
            /></td>
          </tr>
          <tr className="local">
            <th><label htmlFor="localTax">Local Tax:</label></th>
            <td><input
              id="localTax"
              type="text"
              className={effLTax.class}
              value={effLTax.val}
              readOnly
            /></td>
          </tr>
          <tr className="total-tax">
            <th><label htmlFor="totalTax">Total Tax:</label></th>
            <td><input
              id="totalTax"
              type="text"
              className={totalTax.class}
              value={totalTax.val}
              readOnly
            /></td>
          </tr>
        </tbody>
      </table>
    )
  }
}

const mapStateToProps = state => ({
  effFITax: state.finance.tax.effFITax,
  effFTax: state.finance.tax.effFTax,
  effSTax: state.finance.tax.effSTax,
  effLTax: state.finance.tax.effLTax,
  totalTax: state.finance.tax.totalTax,
})

export default connect(mapStateToProps) (Tax)
