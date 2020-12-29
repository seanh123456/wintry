import React from 'react'
// import { connect } from 'react-redux'

class Options extends React.Component {
  render() {
    // const {
    //   filingStatus,
    // } = this.props

    return (
      <div>
        <label for="filingStatus">Filing Status: </label>
        <select id="filingStatus">
          <option name="sin">Single</option>
          <option name="mfj">Married filing jointly</option>
          <option name="mfs">Married filing separately</option>
          <option name="hoh">Head of Household</option>
          <option name="wdc">Qualifying widow(er) with dependent child</option>
        </select>
      </div>
    )
  }
}

// const mapStateToProps = state => ({
//   filingStatus: state.finance.options.filingStatus,
// })

export default /*connect(mapStateToProps)*/ (Options)
