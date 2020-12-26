import React from 'react'
import { connect } from 'react-redux'

class Tax extends React.Component {
  render() {
    const {
      effFITax,
      effFTax,
      effSTax,
      effLTax,
    } = this.props

    return (
      <table className="financial">
        <tbody>
          <tr className="fica">
            <th><label htmlFor="effFITax">Effective FICA Tax:</label></th>
            <td><input
              id="effFITax"
              type="text"
              className={effFITax.class}
              value={effFITax.val}
              readOnly
            /></td>
          </tr>
          <tr className="federal">
            <th><label htmlFor="effFTax">Effective Federal Tax:</label></th>
            <td><input
              id="effFTax"
              type="text"
              className={effFTax.class}
              value={effFTax.val}
              readOnly
            /></td>
          </tr>
          <tr className="state">
            <th><label htmlFor="effSTax">Effective State Tax:</label></th>
            <td><input
              id="effSTax"
              type="text"
              className={effSTax.class}
              value={effSTax.val}
              readOnly
            /></td>
          </tr>
          <tr className="local">
            <th><label htmlFor="effLTax">Effective Local Tax:</label></th>
            <td><input
              id="effLTax"
              type="text"
              className={effLTax.class}
              value={effLTax.val}
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
})

export default connect(mapStateToProps) (Tax)
