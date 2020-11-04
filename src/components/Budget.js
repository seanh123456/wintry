import React from 'react'
import { connect } from 'react-redux'
import { fetchBudgetGreeting } from '../actions/budget'

class Budget extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchBudgetGreeting())
  }

  render() {
    const { error, loading, greeting } = this.props

    if (error) {
      return (
        <header className="App-header">
          <p>Error: {error.message}</p>
        </header>
      )
    }

    if (loading) {
      return (
        <header className="App-header">
          <p>loading...</p>
        </header>
      )
    }

    return (
      <header className="App-header">
        <p>
          budget dashboard says: {greeting}
        </p>
      </header>
    )
  }
}

const mapStateToProps = state => ({
  greeting: state.budget.greeting,
  loading: state.budget.loading,
  error: state.budget.error
})

export default connect(mapStateToProps) (Budget)
