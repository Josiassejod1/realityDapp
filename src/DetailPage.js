import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Card, Container, Col, Row, Image} from 'react-bootstrap';
import Home from './Home';

export * from 'react-router';



const Details = () => {
    const query = useParams();
    const [house, setHouse] = useState({});
    function getHouses() {
        const res = fetch('/api/houses.json',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            }).then((result) => {
                return result.json();
            }).then((myJson) => setHouse(myJson[query.id]));
    }

    useEffect(() => {
        getHouses();
    }, []);


    return (
        <Container style={{ paddingTop: "100px" }}>
            <Row>
                <Col>
                    <Image src={house.header_image}  style={{width: "350px"}}/>
                </Col>
                <Col>
                    <Container>
                    <h1>
                        {house.price}
                    </h1>
                    <p>
                        Bath: {house.bath}
                    </p>
                    <p>
                        Beds: {house.beds}
                    </p>
                    <p>
                        Square Ft: {house.sqft}
                    </p>
                    </Container>
                </Col>
            </Row>
            <Row>
                <p style={{paddingTop: 10}}>
                    {house.description}
                </p>
            </Row>
        </Container>
    );



}


export default Details;