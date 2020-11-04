import React from 'react'
import { connect } from 'react-redux'
import { fetchAuthGreeting } from '../actions/authentication'

class SignIn extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchAuthGreeting())
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
          sign in dashboard says: {greeting}
        </p>
      </header>
    )
  }
}

const mapStateToProps = state => ({
  greeting: state.auth.greeting,
  loading: state.auth.loading,
  error: state.auth.error
})

export default connect(mapStateToProps) (SignIn)
