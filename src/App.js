import { BrowserRouter } from 'react-router-dom';
import Routing from './Components/Routing';
import CrudOperations from './Components/CrudOperations';
import FileUpload from './Components/FileUpload';

function App() {
  return (
    // <BrowserRouter>
    //   < Routing />
    // </BrowserRouter>
    <>
      <CrudOperations />
      <FileUpload />
    </>
  );
}

export default App;
