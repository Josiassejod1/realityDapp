

import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router';
import { Alert, Container, Col, Row, Image, Button, Modal, Card } from 'react-bootstrap';
import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { ethers, BigNumber } from "ethers";




const Seller = () => {
    const { address, provider } = useWeb3();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const sdk = useMemo(
        () =>
            provider ? new ThirdwebSDK(provider.getSigner()) : new ThirdwebSDK(),
        [provider]
    );

    const getAllListings = async () => {
        try {
            const resp = await market.getAllListings();
            console.log(resp);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllListings()
    }, []);


    <Container>
        <Button onclick={handleShow}>
            Create Listing
        </Button>
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
}

export default Seller;