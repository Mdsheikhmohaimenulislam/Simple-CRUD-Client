
import './App.css'
import Users from './Users'

const usersPromise = fetch('http://localhost:5000/users').then(res => res.json());

function App() {


  return (
    <>
     
      <h1>Simple CRUD operation</h1>
      <Users usersPromise={usersPromise}></Users>
     
    </>
  )
}

export default App
