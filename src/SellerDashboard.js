

import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router';
import { Container, Button, Modal, Card, CardGroup } from 'react-bootstrap';
import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { ethers, BigNumber } from "ethers";




const Seller = () => {
    const { address, provider } = useWeb3();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [listings, setListings] = useState([]);
    const sdk = useMemo(
        () =>
            provider ? new ThirdwebSDK(provider.getSigner()) : new ThirdwebSDK(),
        [provider]
    );

    const market = useMemo(
        () =>
            sdk.getMarketplaceModule("0x679751621F15D5780C9e426989C49de109a42547"),
        [sdk]
    );
    const signer = provider ? provider.getSigner() : undefined;

    const getAllListings = async () => {
        try {
            const resp = market.getAllListings();
            resp.then((result) => {
                setListings(result);
            });
           
            console.log(resp);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllListings()

        const interval = setInterval(()=>{
            getAllListings()
           },20000)
             
             
           return()=>clearInterval(interval)
      
    }, []);


    return (
        <Container style={{padding: "40px"}}>
            <CardGroup>
                {
                    listings.length > 0 ? (
                        listings.map((listing) => {
                            const asset = listing.asset;
                            const property = asset.properties;
                            const listingDetails = listing.reservePriceCurrencyValuePerToken;
                            const buyout = listing.buyoutCurrencyValuePerToken;
          
                           return(
                            <Card style={{ width: '18rem', padding: "15px" }}>
                            <Card.Title>{asset.name}</Card.Title>
                            <Card.Img src={property.header_image ?? ''} />
                            <Card.Text>{property.bed ?? property.beds ?? ''} bds</Card.Text>
                            <Card.Text>{property.bath ?? ''} bath</Card.Text>
                            <Card.Text>{property.sqrft ?? ''} sqrft</Card.Text>
                            <Card.Text>{buyout.displayValue + buyout.symbol ?? ''} Buyout Price</Card.Text>
                            <Card.Text>{listingDetails.displayValue + listingDetails.symbol ?? ''} Minimum Threshold Price</Card.Text>
                        </Card>
                           )
                        })
                    ) : (
                        <p>
                            You currently have no deeds uploaded, try adding one !
                        </p>
                    )
                }
            </CardGroup>
            {/* <Button onclick={handleShow}>
                Create Listing
            </Button> */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>

                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Upload Property</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default Seller;