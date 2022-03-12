import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router';
import { Alert, Container, Col, Row, Image, Button, Modal, Card, CardGroup } from 'react-bootstrap';
import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { ethers, BigNumber } from "ethers";
import { Map, Marker } from "pigeon-maps"
//import { NFTStorage } from 'nft.storage/dist/bundle.esm.min.js'
import AB from "./AB.json";


const Details = () => {
    const { address, provider } = useWeb3();
    const sdk = useMemo(
        () =>
            provider ? new ThirdwebSDK(process.env.DEFAULT_PROVIDER) : new ThirdwebSDK(),
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
    const fileUploadContract = new ethers.Contract(
        "0x704fFB24CD0e7B140275736939f6B3c9E9537d35",
        AB,
        signer
    );
    const query = useParams();
    const [house, setHouse] = useState({});
    const [show, setShow] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //https://medium.com/quick-code/how-to-quickly-generate-a-random-gallery-of-images-from-an-unsplash-collection-in-javascript-4ddb2a6a4faf
    // Got this auto generate from here thank you :)))

    const numItemsToGenerate = 3; //how many gallery items you want on the screen
    const numImagesAvailable = 475; //how many total images are in the collection you are pulling from
    const imageWidth = 200; //your desired image width in pixels
    const imageHeight = 200; //desired image height in pixels
    const collectionID = 11430908; //the collection ID from the original url
    function renderGalleryItem(randomNumber) {
        fetch(`https://source.unsplash.com/collection/${collectionID}/${imageWidth}x${imageHeight}/?sig=${randomNumber}`)
            .then((response) => {
                let galleryItem = document.createElement('div');
                galleryItem.classList.add('gallery-item');
                galleryItem.innerHTML = `
      <Image class="gallery-image" src="${response.url}" alt="gallery image", style={{margin: "10px"}}/>
    `
                document.getElementById("generate").appendChild(galleryItem);
            })
    }

    useEffect(() => {
        for (let i = 0; i < numItemsToGenerate; i++) {
            let randomImageIndex = Math.floor(Math.random() * numImagesAvailable + i);
            renderGalleryItem(randomImageIndex);
        }
    }, [])

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

    const getBidInfo = (id) => {
        const getWinningBid = market.getWinningBid(BigNumber.from(id));
        setBidDetails(getWinningBid);
    }
    

    const getListinDetails = async () => {
        try {
            const resp = await market.getListing(BigNumber.from(house.listing_id));
            setNFtAssets(resp);
            console.log(resp);
        } catch (error) {
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

    const onFileUpload = () => {
        console.table(selectedFile);
        uploadToIPFS()
    }

    const uploadToIPFS = async () => {
        const apiKey = process.env.REACT_APP_NFT_STORAGE_KEY;
        const client =  new NFTStorage({token: apiKey});

        if (selectedFile) {
            try {
                const metadata = await client.store({
                    name: selectedFile.name,
                    description:
                      "Supporting document: " + selectedFile.name,
                    image: new File([selectedFile], selectedFile.name, { type: selectedFile.type }),
                  });
                const url = metadata.url;
                console.log(url);
                const resp = await fileUploadContract.storeFile(url);
                console.log("Uploaded file");
            } catch(error) {
                console.log("Uploading failed");
                alert("Failure uploading file");
                console.error(error)
            }
        } else {
            alert('No file selected');
        }
    }

    const fileData = () => {
        if (selectedFile) {
            return (
                <div>
                    <h2>File Details:</h2>

                    <p>File Name: {selectedFile.name}</p>


                    <p>File Type: {selectedFile.type}</p>


                    <p>
                        Last Modified:{" "}
                        {selectedFile.lastModifiedDate.toDateString()}
                    </p>
                </div>
            );
        }
    };

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
                                <div>
                                    <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
                                    <Button onClick={onFileUpload}>
                                        Upload Supporting Docs
                                    </Button>
                                    {fileData()}
                                </div>
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
                        <p style={{ paddingTop: 10 }}>
                            {house.description}
                        </p>
                    </Container>
                </Col>
            </Row>
            <Row style={{ backgroundColor: "lightgrey", borderRadius: "10px", width: "75%" }}>

            </Row>
            <Row style={{ padding: "10px" }}>
                <Col>
                    <Map height={300} defaultCenter={house?.coordinates ?? [38.610390, -121.538600]} defaultZoom={11}>
                        <Marker anchor={house?.coordinates ?? [38.610390, -121.538600]} />
                    </Map>
                </Col>
            </Row>
            <Row>
                <h1>Gallery</h1>
                <CardGroup id="generate">

                </CardGroup>
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