import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from '@material-ui/core';
import SearchAppBar from './components/SearchAppBar';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <SearchAppBar/>
      {/* <Container > */}
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
      {/* </Container> */}
      {/* <StickyFooter/> */}
    </BrowserRouter>
  );
}

export default App;
