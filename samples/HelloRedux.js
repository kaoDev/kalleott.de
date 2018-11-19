const valueReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

const stateReducer = (state = { value: 0 }, action = {}) => {
  return {
    value: valueReducer(state.value, action),
  }
}

const increment = { type: 'INCREMENT' }
const decrement = { type: 'DECREMENT' }

class HelloRedux extends React.Component {
  constructor() {
    this.state = stateReducer()
    this.dispatch = action => {
      this.setState(state => stateReducer(state, action))
    }
  }

  render() {
    const { value } = this.state
    return (
      <div>
        <div>value: {value}</div>
        <button onClick={() => this.dispatch(increment)}>+</button>
        <button onClick={() => this.dispatch(decrement)}>-</button>
      </div>
    )
  }
}
render(<HelloRedux />)
