import './App.css';
import Landing from './Pages/Landing/Landing';
import { Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import CrearReceta  from './Pages/crearRecetas/CrearReceta';
import Details from './Components/Details/Details';


function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/crear/receta" component={CrearReceta} />
      <Route exact path="/receta/:id" component={Details} />
    </div>
  );
}

export default App;
