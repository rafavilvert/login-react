import './App.css';
import { AuthProvider } from './components/context/Auth';
import Routes from './routes/Routes';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </div>
  );
}

export default App;
