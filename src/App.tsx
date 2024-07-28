import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./layout/Header";
import AddCustomer from "./pages/AddCustomers";
import CustomerList from "./pages/Customers";
import Favorites from "./pages/Favorites";

import "./assets/styles/base.scss"

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/add-customer" element={<AddCustomer />} />
          <Route path="/customer-list" element={<CustomerList />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
