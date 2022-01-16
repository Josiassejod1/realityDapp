import React, { useEffect } from "react";
import Home from "./Home";
import Details from "./DetailPage";
import Seller from "./SellerDashboard";

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
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
