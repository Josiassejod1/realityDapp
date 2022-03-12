import React, { useEffect } from "react";
import Home from "./Home";
import Details from "./DetailPage";
import Seller from "./SellerDashboard";
import Lending from "./Lending";

import { Nav, NavItem, NavLink, Container, Button } from "reactstrap";
import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


const App = () => {
  const sdk = new ThirdwebSDK();
  const signer = provider ? provider.getSigner() : undefined;
  const { connectWallet, address, error, provider } = useWeb3();
  useEffect(() => {
    sdk.setProviderOrSigner(signer);
  }, [signer]);

  return (
    <Router>
      <Container style={{ justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
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
          <NavItem>
            <NavLink
            >
              <Link to="/lending">Lending</Link>
            </NavLink>
          </NavItem>
          <NavItem>
            {
              !address && (

                <Button variant="primary" onClick={() => connectWallet("injected")}>Connect Wallet</Button>

              )
            }
          </NavItem>
        </Nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home/:id" element={<Details />} />
          <Route path="/seller" element={<Seller />} />
          {/* <Route path="/Lending" element={<Lending />} /> */}
        </Routes>
      </Container>
      <Container style={{padding: "50px"}}>
            <footer>
                Created by <a target="_blank" src='https://www.twitter.com/officaldalvinj'>@officaldalvinj</a> | 	&trade; 2022 Reality dApp 
            </footer>
      </Container>
    </Router>
  );
};

export default App;
