import React from 'react'
import { connect } from 'react-redux'
import { fetchBudgetGreeting } from '../actions/budget'

class Budget extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchBudgetGreeting())
  }

  render() {
    const { error, loading, greeting } = this.props
    var greet = <h3>Budget dashboard says: {greeting}</h3>

    if (error) {
      greet = <h3>Error: {error.message}</h3>
    }

    if (loading) {
      greet = <h3>loading...</h3>
    }

    return (
      <header className="App-header">
        <div className="wrapper">
          {greet}
        </div>
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
