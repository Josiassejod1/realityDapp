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

await module.claim(1);