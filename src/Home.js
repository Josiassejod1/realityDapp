
import { Card, Button, Row, Container, CardGroup , Image} from 'react-bootstrap';
import React, { useState, useEffect } from "react";
import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";
import 'bootstrap/dist/css/bootstrap.css';
import {
    Link,
} from "react-router-dom";

const Home = () => {
    const [houses, setHouses] = useState([]);
    const { address } = useWeb3();
    function getHouses() {
        const res = fetch('/api/houses.json',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }).then((result) => {
                return result.json();
            }).then((myJson) => setHouses(myJson));
    }

    const generateHomes = () => {
        return (
            <Container style={{paddingTop: "40px"}}>
                <CardGroup>
                {
                    houses.map((home) => {
                        return (
                                <Link to={'/home/' + home.id} key={home.id}>
                                    <Card style={{ width: '18rem', padding: "15px" }}>
                                        <Card.Img src={home.header_image} />
                                        <Card.Text>{home.street}, {home.city}, {home.state} {home.zipcode}</Card.Text>
                                        <Button variant="primary">Learn More</Button>
                                    </Card>
                                </Link>
                        );
                    })
                }
            </CardGroup>
            </Container>
        )
    }
    useEffect(() => {
        getHouses();
    }, []);

    if (address) {
        return (
            <div>
                {
                    generateHomes()
                }
                {/* <div><p>{JSON.stringify(houses, null, 2)}</p></div> */}
            </div>
        );
    } else {
        return(
            <Container style={{paddingTop: "30px"}}>
                <Card>
                <Card.Img src="https://bafybeid6kv4rjcpu5za222sgzsxolucqy7esmlqylzapvgxwrf2xqofsua.ipfs.dweb.link/" width="75%"/>
                <Card.Body>
                    <Card.Title>Step Into A New Home Today with Reality dApp</Card.Title>
                </Card.Body>
            </Card>
            </Container>
        )
    }
   
}

export default Home;