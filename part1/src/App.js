import './App.css';
import Mensaje from './mensaje';

const Description = () => {
  return <p>
    Esta es la app de el curso de fullStack 
  </p>
}
const App = () => {
  return (
    <div className='App'>
      <Mensaje color = 'red'message='Estamos trabajando '/>
      <Mensaje color = 'red'message='En un curso '/>
      <Mensaje color = 'red'message='de react'/>
      <Description />
    </div>
  )
}
  
export default App;

