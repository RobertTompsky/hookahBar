import Hall from '../components/Hall/Hall'
import ReservationsBar from '../components/Reservations/ReservationsBar'
import './App.css'

function App() {
  return (
    <div
      className="flex items-center justify-center 
      w-screen h-screen box-border">
      <div
        className="flex flex-row p-8 w-5/6 h-5/6 
        mx-auto bg-base-300 rounded-3xl shadow-lg">
        <ReservationsBar />
        <Hall />
      </div>
    </div>
  )
}

export default App
