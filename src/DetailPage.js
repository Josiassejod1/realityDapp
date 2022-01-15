import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Card, Container, Col, Row, Image, Button } from 'react-bootstrap';
import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";
import Home from './Home';
dotenv.config();

const Details = () => {
    const { connectWallet, address, error, provider } = useWeb3();
    const sdk = new ThirdwebSDK();
    const market = useMemo(
        () =>
          sdk.getMarketplaceModule("0xCb67A96FAd36D8c24f192B9eDaD5fF3c7A7A867f"),
        [sdk]
      );
    const signer = provider ? provider.getSigner() : undefined;
    const query = useParams();
    const [house, setHouse] = useState({});
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [bidData, setBidDate] = useState({});
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

    useEffect(() => {
        sdk.setProviderOrSigner(signer);
    }, [signer]);

    const makeBid = async (listingId) => {
        // market.makeAuctionListingBid(

        // )
    }

    return (
        <Container style={{ paddingTop: "100px" }}>
            <Row>
                <Col>
                    <Image src={house.header_image} style={{ width: "350px" }} />
                    {
                        address && (
                            <Row>
                                <Button
                                onClick={handleShow}
                                    style={{
                                        backgroundColor: "#B10000",
                                        width: "200px",
                                        color: "white",
                                        padding: "15px",
                                        margin: "10px"
                                    }}>
                                    Place an Offer
                                </Button>
                            </Row>
                        )
                    }
                </Col>
                <Col>
                    <Container>
                        <h1>
                            $ {numberWithCommas(house.price ?? '')}
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
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Your are bidding at {house.street}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You are placing a bid on a home if you are selected 
                    you will be followed up with in other details. You will also
                    need to provide supporting documents.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


}


export default Details;