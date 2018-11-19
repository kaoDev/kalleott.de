const HelloName = ({ children }) => <h1>Hello, {children}!</h1>

render(
  <HelloName>
    Peter <h2 style={{ display: 'inline' }}>some nested stuff</h2>
  </HelloName>
)
