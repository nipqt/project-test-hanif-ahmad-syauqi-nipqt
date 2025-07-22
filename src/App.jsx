import Header from './components/Header.jsx'
import Postlists from './components/PostList.jsx';
import Banner from './components/Banner.jsx';

function App() {
  return (
    <div>
      <Header/>
        <main>
          <Banner />
          <Postlists />
        </main>
    </div>
  );
}

export default App