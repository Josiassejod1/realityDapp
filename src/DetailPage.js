import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Card, Container, Col, Row, Image ,Button } from 'react-bootstrap';

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
                    <Image src={house.header_image} style={{ width: "350px" }} />
                    <Row>
                        <Button style={{
                            backgroundColor: "#B10000", 
                            width: "200px", 
                            color: "white", 
                            padding: "15px", 
                            margin: "10px"
                        }}>
                            Place an Offer
                        </Button>
                    </Row>
                </Col>
                <Col>
                    <Container>
                        <h1>
                            $ {numberWithCommas(house.price)}
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
                <p style={{ paddingTop: 10 }}>
                    {house.description}
                </p>
            </Row>

            <Row>

            </Row>
        </Container>
    );

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


}


export default Details;