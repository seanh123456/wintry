import React from 'react'
import { connect } from 'react-redux'

class Calculations extends React.Component {
  render() {
    const {
      gIncome,
      nIncome,
      gComp,
      nComp,
      nTakeHome,
      savings,
    } = this.props

    return (
      <table className="financial">
        <tbody>
          <tr className="table_header">
            <th>Calculations</th>
            <th>Annual</th>
            <th>Monthly</th>
            <th>Paycheck</th>
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
  gIncome: state.finance.income.gIncome,
  nIncome: state.finance.income.nIncome,
  gComp: state.finance.income.gComp,
  nComp: state.finance.income.nComp,
  nTakeHome: state.finance.income.nTakeHome,
  savings: state.finance.income.savings,
})

export default connect(mapStateToProps) (Calculations)
