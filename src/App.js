import Header from "./components/Header";
import Main from "./components/Main";
import Request from "./components/Request";
import './scss/style.scss'
import Layout from './components/Layout';

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
      <Layout>
        <Request />
      </Layout>
    </div>
  );
}

export default App;
