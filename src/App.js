import "./App.css";
import DynamicForm from "./components/Form";
import Data from "./Database";

function App() {
  return (
    <div className="">
      <DynamicForm fields={Data} />
    </div>
  );
}

export default App;
