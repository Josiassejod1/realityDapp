
import { Card, Button, Row } from 'react-bootstrap';
import React, {useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.css';

const Home = () => {
    const [houses, setHouses] = useState([]);
  function getHouses() {
    const res = fetch('/api/houses.json',
    {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }}).then((result) => {
      return result.json();
    }).then((myJson) => setHouses(myJson));
  }

  const generateHomes = ()  => {
    return houses.map((home) => {
        return(
          <Row>
          <Card>
            <Card.Img src={home.header_image} />
            <Card.Text>{home.street}, {home.city}, {home.state} {home.zipcode}</Card.Text>
            <Button variant="primary">Learn More</Button>
          </Card>
          </Row>
        );
      })
  }

  useEffect(() => {
    getHouses();
  }, []);


  return (
    <div>
      {
        generateHomes()
      }
       <div><p>{JSON.stringify(houses, null, 2)}</p></div>
    </div>
  );
}

export default Home;