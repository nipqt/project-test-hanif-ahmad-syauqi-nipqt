import Header from './components/Header.jsx'
import Postlists from './components/PostList.jsx';
import Banner from './components/Banner.jsx';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Header/>
      <main>
        <Banner />
        <Postlists />
      </main>
    </Router>
  );
}

export default App