pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract ManageListing {
    uint256 public indexId;
    uint256 public tokenId;
    Bid[] public bids;

    struct Listing {
        int256 baths;
        int256 beds;
        string city;
        string description;
        string headerImage;
        string price;
        string sqft;
        string state;
        string streetAddress;
        string zipcode;
        uint256 id;
        uint256 listingId;
        uint256[] coordinates;
    }

    struct Bid {
        address bidder;
        uint listindId;
    }


    Listing[] public listings;

    event NewListing(address sender, uint256 id, string description);


    function createListing(
        int256  baths,
        int256  beds,
        string memory city,
        string memory description,
        string memory headerImage,
        string memory price,
        string memory sqft,
        string memory state,
        string memory streetAddress,
        string memory zipcode
    ) public {
        require(bytes(streetAddress).length > 0);
        console.log("current indexId", indexId);
        console.log("current tokenId", tokenId);

        Listing memory newListing = Listing({
            baths: baths,
            beds: beds,
            city: city,
            coordinates: new uint256[](0),
            description: description,
            headerImage: headerImage,
            id: indexId,
            listingId: tokenId,
            price: price,
            sqft: sqft,
            state: state,
            streetAddress: streetAddress,
            zipcode: zipcode
        });

        listings.push(newListing);

        indexId++;
        tokenId++;

        console.log("indexId incremented", indexId);
        console.log("tokenId incremented", tokenId);


        emit NewListing(msg.sender, indexId, description);
    }

    function getAllListings() public view returns (Listing[] memory) {
        return listings;
    }

    function addBidder(uint256 listingId) public {
        Bid memory bid = Bid(msg.sender, listingId);
        bids.push(bid);
    }

    function getListing(uint256 listingId) public  view returns (Listing memory) {
        require(listings.length > 0);
        for (uint i = 0; i < listings.length; i++ ){
            if (listingId == listings[i].listingId) {
                console.log("Listing found");
                return listings[listingId];
            }
        }

        revert('Not found');
    }

}
