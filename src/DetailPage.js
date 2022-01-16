import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router';
import { Alert, Container, Col, Row, Image, Button, Modal, Card } from 'react-bootstrap';
import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";
import {ethers, BigNumber} from "ethers";


const Details = () => {
    const { address, provider } = useWeb3();
    const sdk = useMemo(
        () =>
            provider ? new ThirdwebSDK(provider.getSigner()) : new ThirdwebSDK(),
        [provider]
    );
    const [listIdBid, setListIdOffer] = React.useState(0);
    const [placedBid, setPlacedBid] = useState(false);
    const [bidDetails, setBidDetails] = useState({});
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
            }).then((myJson) => {
                setHouse(myJson[query.id])
               // getBidInfo(myJson[query.id].listing_id);
            }).then(() => {
              
            });
    }

    const  getBidInfo = (id) => {
        const getWinningBid = market.getWinningBid(BigNumber.from(id));
        setBidDetails(getWinningBid);
    }

    const getListinDetails = async () => {
            try{
                const resp = await market.getListing(BigNumber.from(house.listing_id));
                setNFtAssets(resp);
                console.log(resp);
            } catch(error) {
                console.log(error);
            }
    }

    useEffect(() => {
        getHouses();
       // getListinDetails();
    }, []);
    
   

    useEffect(() => {
        sdk.setProviderOrSigner(signer);
    }, [signer]);

    const makeBid = async () => {
        setPlacedBid(true);
        handleClose();
        try {
            await market.makeAuctionListingBid(
                {
                    listingId: house.listing_id,
                    pricePerToken: ethers.utils.parseUnits(listIdBid, 18)
                }
            );
            console.log("Listing successful");
        } catch (err) {
            hasError(err);
            setTimeout(() => {
                hasError(null);
            }, 10000)
            console.log(err);
        }

        setTimeout(() => {
            setPlacedBid(false);
        }, 10000)
    }

    return (
        <Container style={{ paddingTop: "100px" }}>
            {placedBid &&
                (
                    <Alert variant={!errors ? 'success' : 'danger'}>
                        {!errors ? 'Placed A Bid For The Property 🏠' : 'Unable to Place Bid 😞: ' + errors}
                    </Alert>
                )
            }
            <Row >
                <Col>
                    <Image src={house.header_image} style={{ width: "350px", borderRadius: "10px" }} />
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
            <Row style={{backgroundColor: "lightgrey", borderRadius: "10px"}}>
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