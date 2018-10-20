class HelloState extends React.Component {
  constructor() {
    this.state = { value: 0 }
    this.increment = () => {
      this.setState(state => ({
        value: state.value + 1,
      }))
    }
    this.decrement = () => {
      this.setState(state => ({
        value: state.value - 1,
      }))
    }
  }

  render() {
    const { value } = this.state
    return (
      <div>
        <div>value: {value}</div>
        <button onClick={this.increment}>+</button>
        <button onClick={this.decrement}>-</button>
      </div>
    )
  }
}
render(<HelloState />)
