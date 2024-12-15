import { ArchwayClient } from '@archwayhq/arch3.js';
import { SigningArchwayClient } from '@archwayhq/arch3.js';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { GasPrice, calculateFee } from "@cosmjs/stargate";

const network = {
  chainId: 'constantine-3',
  endpoint: 'https://rpc.constantine.archway.tech',
  prefix: 'archway',
};

const mnemonic = 'path index calm physical toy when sell annual pill elite creek pave';
const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: network.prefix });
const accounts = await wallet.getAccounts();
const client = await SigningArchwayClient.connectWithSigner(network.endpoint, wallet);

const marketContractAddress = 'archway1cwx58k4xew5zrc4zqs888w58fhckvn09ryh02qx03dv83g8d6fyq6kcl3s';
const contractAddress = 'archway1xlu0usjnk99kczu9f7kahdj05j4aq9q6glevvm8uwm8e3nr6z99snxqlh8'; // collection address

let purchase_amount = {
    amount: "100",
    denom: "aconst"
};

const gasPrice = GasPrice.fromString("1000000000000aconst");
const { transactionHash } = await client.execute(
  accounts[0].address,
  marketContractAddress,
  {
    "send_tokens": {
        "msg": {
            "purchase": {
                "key": "1692120023000"
            }
        }
    }
  },
  calculateFee(1000000, gasPrice),
  "",
    [purchase_amount]
);


console.log(transactionHash);