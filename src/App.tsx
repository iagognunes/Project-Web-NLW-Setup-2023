import './styles/global.css'
import { Habit } from "./components/habit"

function App() {
  return (
    <div>
      <Habit completed={3}/>
      <Habit completed={10}/>
      <Habit completed={32}/>
      <Habit completed={35}/>
      <Habit completed={388}/>
      <Habit completed={36}/>
    </div>
  )
}

export default App
