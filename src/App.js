import React from "react";
import Home from "./Home";
import Details from "./DetailPage";

import { Nav, NavItem, NavLink, Container } from "reactstrap";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


const App = () => {
  return (
    <Router>
       <Container style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Nav
        >
        <div>
          <img src="https://bafkreigq6tnebvxy5gqnaj2eqrjr6gqfczogn2hg43s4wqmezvvi7qun24.ipfs.dweb.link/" />
        </div>
          <NavItem>
            <NavLink
            >
              <Link to="/">Home</Link>
            </NavLink>
          </NavItem>
        </Nav>
     
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home/:id" element={<Details />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
