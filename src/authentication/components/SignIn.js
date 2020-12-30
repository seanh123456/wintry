import React from 'react'
import { connect } from 'react-redux'
import { fetchAuthGreeting } from '../actions/authentication'

class SignIn extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchAuthGreeting())
  }

  render() {
    const { error, loading, greeting } = this.props
    var greet = <h3>Authentication dashboard says: {greeting}</h3>

    if (error) {
      greet = <h3>Error: {error.message}</h3>
    }

    if (loading) {
      greet = <h3>loading...</h3>
    }

    return (
      <div className="App-content">
        <section className="wrapper">
          <div>
            {greet}
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  greeting: state.auth.auth.greeting,
  loading: state.auth.auth.loading,
  error: state.auth.auth.error
})

export default connect(mapStateToProps) (SignIn)
