
import { Card, Button, Row, Container, CardGroup, Col } from 'react-bootstrap';
import React, { useState, useEffect } from "react";
import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { Map, Marker } from "pigeon-maps"
import 'bootstrap/dist/css/bootstrap.css';
import {
    Link,
} from "react-router-dom";

const Home = () => {
    const [houses, setHouses] = useState([]);
    const [coordinates, setCoordinates] = useState([]);
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
            }).then((myJson) => {
                setHouses(myJson)
                var tempArray = [];
                myJson.map(element => {
                     console.log(element);
                    tempArray.push(element.coordinates);
                });
                setCoordinates(tempArray);
            });
    }

    const generateHomes = () => {
        return (
            <Container style={{ paddingTop: "40px" }}>
                <Row>
                    <Col>
                        <Map defaultCenter={coordinates?.[0] ?? [38.610390, -121.538600]} defaultZoom={7}>
                            {
                                coordinates.map((latLong) => {
                                   return(
                                        <Marker anchor={latLong} />
                                   );
                                })
                            }
                        </Map>
                    </Col>
                    <Col>
                        <CardGroup>
                            {
                                houses.length > 0 ? (
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
                                ) : (
                                    <Container style={{ justifyContent: 'center', alignItems: 'center', margin: "0 auto" }}>
                                        <Card>
                                            <Card.Title>We are out of inventory 🏠 </Card.Title>
                                            <Card.Body>
                                                Checkback for update listings
                                            </Card.Body>
                                        </Card>
                                    </Container>
                                )
                            }
                        </CardGroup>
                    </Col>
                </Row>
            </Container>
        )
    }
    useEffect(() => {
        getHouses();
    }, []);

    if (address) {
        return (
            <div style={{ padding: "10px" }}>

                <h1> Active Listings </h1>
                {
                    generateHomes()
                }

            </div>
        );
    } else {
        return (
            <Container style={{ paddingTop: "30px" }}>
                <Card>
                    <Card.Img src="https://bafybeid6kv4rjcpu5za222sgzsxolucqy7esmlqylzapvgxwrf2xqofsua.ipfs.dweb.link/" width="75%" />
                    <Card.Body>
                        <Card.Title>Step Into A New Home Today with Reality dApp</Card.Title>
                    </Card.Body>
                </Card>
            </Container>
        )
    }

}

export default Home;