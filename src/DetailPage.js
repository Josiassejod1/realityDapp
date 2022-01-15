import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Container } from 'react-bootstrap';

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
        <Container>
            <p>{JSON.stringify(house, null, 2)}</p>
        </Container>
    );



}


export default Details;