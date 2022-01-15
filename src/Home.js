
import { Card, Button, Row, Container, CardGroup } from 'react-bootstrap';
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

const Home = () => {
    const [houses, setHouses] = useState([]);
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
            <CardGroup>
                {
                    houses.map((home) => {
                        return (
                                <Link to={'/home/' + home.id}>
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Img src={home.header_image} />
                                        <Card.Text>{home.street}, {home.city}, {home.state} {home.zipcode}</Card.Text>
                                        <Button variant="primary">Learn More</Button>
                                    </Card>
                                </Link>
                        );
                    })
                }
            </CardGroup>
        )
    }

    useEffect(() => {
        getHouses();
    }, []);


    return (
        <div>
            {
                generateHomes()
            }
            {/* <div><p>{JSON.stringify(houses, null, 2)}</p></div> */}
        </div>
    );
}

export default Home;