// import { ThirdwebSDK } from "@3rdweb/sdk";
// import {ethers} from "ethers";
// import dotenv from "dotenv";
// dotenv.config();

// // You can switch out this provider with any wallet or provider setup you like.
// const provider = new ethers.Wallet(
//     process.env.PRIVATE_KEY,
//     ethers.getDefaultProvider(process.env.DEFAULT_PROVIDER)
// );

// const sdk = new ThirdwebSDK(provider);
// const module = sdk.getDropModule();
// // await module.createBatch([{
//     name: "Test",
//         description: "The description for the bundle drop.",
//         image: "https://bafkreigfrphsofaldcuhajes7ujhc3t2clu5ucqu6eu5pco3eked4ymhsa.ipfs.dweb.link",
// address: process.env.CURRENCY_CONTRACT_ADDRESS
// }]);
//module.transfer(process.env.MARKET_PROVIDER, "1")
module.claim(1);
// const module = sdk.getMarketplaceModule(process.env.MARKET_PROVIDER);

// const auction = {
//   // address of the contract the asset you want to list is on
//   assetContractAddress: "0x6350c1ccee6fa72a142c6a4d459dd2c43a1e81e1",
//   // token ID of the asset you want to list
//   tokenId: "0",
//   // in how many seconds with the listing open up
//   startTimeInSeconds: 0,
//   // how long the listing will be open for
//   listingDurationInSeconds: 86400,
//   // how many of the asset you want to list
//   quantity: 1,
//   // address of the currency contract that will be used to pay for the listing
//   currencyContractAddress: process.env.CURRENCY_CONTRACT_ADDRESS,
//   // how much people would have to bid to instantly buy the asset
//   buyoutPricePerToken: "1",
//   // the minimum bid that will be accepted for the token
//   reservePricePerToken: "1",
// }
//const resp = await module.getAuctionListing(0);
//console.log(resp);

//await module.createAuctionListing(auction);