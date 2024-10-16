import React from 'react';
import { BrowserRouter } from "react-router-dom";
import Spinner from './component/Spinner';
import { useSelector } from 'react-redux';
import AllRoutes from './routes/Routes';
import 'remixicon/fonts/remixicon.css';


const App = () => {
  const { isLoading } = useSelector((state) => state.master);
  return (
    <>
      {isLoading && <Spinner />}
        <BrowserRouter>
          <AllRoutes />
        </BrowserRouter>
    </>
  );
}


export default App;
