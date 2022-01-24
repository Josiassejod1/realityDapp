import { ThirdwebSDK } from "@3rdweb/sdk";
import {ethers} from "ethers";
import dotenv from "dotenv";
dotenv.config();

const provider = new ethers.Wallet(
    process.env.PRIVATE_KEY,
    ethers.getDefaultProvider(process.env.DEFAULT_PROVIDER)
);

const sdk = new ThirdwebSDK(provider);

const module = sdk.getDropModule(process.env.NFT_DROP_MODULE);

const market = sdk.getMarketplaceModule(process.env.MARKET_PROVIDER);


try {
    console.log("creating the new nft");
    const batch  = await module.createBatch([{
        name: "Home Test",
        description: "The description for the bundle drop.",
        image: "https://bafkreigfrphsofaldcuhajes7ujhc3t2clu5ucqu6eu5pco3eked4ymhsa.ipfs.dweb.link",
        address: process.env.CURRENCY_CONTRACT_ADDRESS,
        properties: {}
    }]);
    
    console.log("created the new nft :))", batch);

    await module.claim(1);

    console.log("claimed the nft");

    const auction = {
        // address of the contract the asset you want to list is on
        assetContractAddress: process.env.NFT_DROP_MODULE,
        // token ID of the asset you want to list
        tokenId: batch[0],
        // in how many seconds with the listing open up
        startTimeInSeconds: 0,
        // how long the listing will be open for
        listingDurationInSeconds: 86400,
        // how many of the asset you want to list
        quantity: 1,
        // address of the currency contract that will be used to pay for the listing
        currencyContractAddress: process.env.CURRENCY_CONTRACT_ADDRESS,
        // how much people would have to bid to instantly buy the asset
        buyoutPricePerToken: "1",
        // the minimum bid that will be accepted for the token
        reservePricePerToken: "1",
      }
      
    await market.createAuctionListing(auction);
} catch(error) {
    console.log('Was not able to get it working: ', error);
}
