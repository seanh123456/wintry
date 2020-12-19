import React from 'react'
import { connect } from 'react-redux'
import { fetchRecipeGreeting } from '../actions/recipe'

class Recipe extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchRecipeGreeting())
  }

  render() {
    const { error, loading, greeting } = this.props
    var greet = <h3>Recipe dashboard says: {greeting}</h3>

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
  greeting: state.recipe.greeting,
  loading: state.recipe.loading,
  error: state.recipe.error
})

export default connect(mapStateToProps) (Recipe)
