import logo from './logo.svg';
import './App.css';
import CarDealerList from './components/CarDealerList';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
        {/* <img src={"https://app.golden-dreams.org/static/media/eng-title.png"} className="App-logo" alt="logo" /> */}
        <CarDealerList />
      {/* </header> */}
    </div>
  );
}

export default App;
