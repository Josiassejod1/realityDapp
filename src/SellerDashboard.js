

import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router';
import { Container, Button, Modal, Card, CardGroup, Table } from 'react-bootstrap';
import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { ethers, BigNumber } from "ethers";
import AB from "./AB.json";




const Seller = () => {
    const { address, provider } = useWeb3();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [listings, setListings] = useState([]);
    const [files, setFiles] = useState([]);
    const [propertyImage, setImage] = useState(null);
    const [propertyAddress, setAddress] = useState("");
    const [zipcode, setZip] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [street, setStreet] = useState("");
    const [beds, setBeds] = useState("");
    const [baths, setBaths] = useState("");
    const [description, setDescription] = useState("");

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

    const fileUploadContract = new ethers.Contract(
        "0x704fFB24CD0e7B140275736939f6B3c9E9537d35",
        AB,
        signer
    );

    const handleSubmit = (e) => {
        print("Form submitted");
        console.log(propertyAddress)
        console.log(zipcode)
        console.log(city)
        console.log(state)
        console.log(street)
        console.log(beds)
        console.log(baths)
        console.log(description)
    }

    // const getAllListings = async () => {
    //     try {
    //         await market.getAllListings().then((result) => setListings(result));
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const getAllFiles = async () => {
        await fileUploadContract.getAllFles().then((result) => {
            setFiles(result);
            console.log(result);
        });

    }

    useEffect(() => {
        // getAllListings();
        //getAllFiles();

        const interval = setInterval(() => {
            //  getAllListings()
            //getAllFiles();
        }, 10000)


        return () => clearInterval(interval)

    }, []);


    const fileData = () => {
        if (propertyImage) {
            return (
                <div>
                    <h2>File Details:</h2>

                    <p>File Name: {propertyImage.name}</p>


                    <p>File Type: {propertyImage.type}</p>


                    <p>
                        Last Modified:{" "}
                        {propertyImage.lastModifiedDate.toDateString()}
                    </p>
                </div>
            );
        }
    };



    if (address) {
        return (
            <Container style={{ padding: "40px" }}>
                <CardGroup>
                    {
                        listings.length > 0 ? (
                            listings.map((listing) => {
                                const asset = listing.asset;
                                const property = asset.properties;
                                const listingDetails = listing.reservePriceCurrencyValuePerToken;
                                const buyout = listing.buyoutCurrencyValuePerToken;

                                return (
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

                <div>
                    {
                        files.length > 0 ? (
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Address</th>
                                        <th>NFT Document MetaData</th>
                                    </tr>
                                </thead>
                                {
                                    files.map((file) => {
                                        return (
                                            <tr>
                                                <td>{file.owner.substring(0, 6) + "..."}</td>
                                                <td>{file.tokenURI}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </Table>
                        ) : <p>No files uploaded</p>
                    }
                </div>
                <Button onClick={handleShow}>
                    Create Listing
                </Button>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <form>
                            <input type="text" name="address" placeholder="Address" onChange={e => setAddress(e.target.value)}></input>
                            <input type="text" name="zipcode" placeholder="Zip Code" onChange={e => setZip(e.target.value)}></input>
                            <input type="text" name="state" placeholder="State" onChange={e => setState(e.target.value)}></input>
                            <input type="text" name="street" placeholder="Street" onChange={e => setStreet(e.target.value)}></input>
                            <input type="text" name="city" placeholder="City" onChange={e => setCity(e.target.value)}></input>
                            <input type="number" name="beds" placeholder="Beds" onChange={e => setBeds(e.target.value)}></input>
                            <input type="number" name="bath" placeholder="Baths" onChange={e => setBaths(e.target.value)}></input>
                            <input type="text" name="description" placeholder="Description" onChange={e => setDescription(e.target.value)}></input>
                            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                            <Button onClick={() => { }}>
                                Upload Image
                            </Button>
                            {fileData()}
                        </form>
                    </Modal.Header>
                    <Modal.Body>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSubmit}>Upload Property</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        )
    } else {
        return (<p>Seller Dashboard</p>)
    }
}

export default Seller;