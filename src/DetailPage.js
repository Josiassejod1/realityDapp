import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router';
import { Alert, Container, Col, Row, Image, Button, Modal } from 'react-bootstrap';
import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";


const Details = () => {
    const { address, provider } = useWeb3();
    const sdk = useMemo(
        () =>
            provider ? new ThirdwebSDK(provider.getSigner()) : new ThirdwebSDK(),
        [provider]
    );
    const [listIdBid, setListIdOffer] = React.useState(0);
    const [placedBid, setPlacedBid] = useState(false);
    const [errors, hasError] = useState(false);
    const market = useMemo(
        () =>
            sdk.getMarketplaceModule("0x679751621F15D5780C9e426989C49de109a42547"),
        [sdk]
    );
    const signer = provider ? provider.getSigner() : undefined;
    const query = useParams();
    const [house, setHouse] = useState({});
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);




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

    const getListinDetails = async () => {
        const resp = await market.getAuctionListing(house.listing_id);
        console.log(resp);
    }

    // This would replace all the hardcoded details
    // getListinDetails();

    useEffect(() => {
        getHouses();
    }, []);

    useEffect(() => {
        sdk.setProviderOrSigner(signer);
    }, [signer]);

    const makeBid = async () => {
        setPlacedBid(true);
        try {
            await market.makeAuctionListingBid(
                {
                    listingId: house.listing_id,
                    pricePerToken: listIdBid
                }
            );
            console.log("Listing successful");
        } catch (err) {
            hasError(true);
            setTimeout(() => {
                hasError(false);
            }, 2000)
            console.log(err);
        }

        setTimeout(() => {
            setPlacedBid(false);
        }, 2000)
    }

    return (
        <Container style={{ paddingTop: "100px" }}>
            {placedBid &&
                (
                    <Alert variant={!errors ? 'success' : 'danger'}>
                        {!errors ? 'Placed A Bid For The Property 🏠' : 'Unable to Place Bid 😞'}
                    </Alert>
                )
            }
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
                    <p>
                        You are placing a bid on a home if you are selected
                        you will be followed up with in other details. You will also
                        need to provide supporting documents.
                    </p>
                    <p>
                        { }
                    </p>
                    <input
                        type="number"
                        placeholder="enter bid for AUCTION"
                        onChange={(e) => setListIdOffer(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={makeBid}>Submit Offer</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


}


export default Details;