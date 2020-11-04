import React from 'react'
import { connect } from 'react-redux'
import { fetchFireGreeting } from '../actions/fire'

class Fire extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchFireGreeting())
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
          fire dashboard says: {greeting}
        </p>
      </header>
    )
  }
}

const mapStateToProps = state => ({
  greeting: state.fire.greeting,
  loading: state.fire.loading,
  error: state.fire.error
})

export default connect(mapStateToProps) (Fire)
