import React from 'react'
import { connect } from 'react-redux'
import { fetchRecipeGreeting } from '../actions/recipe'

class Recipe extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchRecipeGreeting())
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
          recipe dashboard says: {greeting}
        </p>
      </header>
    )
  }
}

const mapStateToProps = state => ({
  greeting: state.recipe.greeting,
  loading: state.recipe.loading,
  error: state.recipe.error
})

export default connect(mapStateToProps) (Recipe)
