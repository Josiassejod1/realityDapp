import { Network, Market, TxBuilderV2, v1, v2 } from '@aave/protocol-js';
import React, { useState } from "react";
import { ButtonGroup, ToggleButton, Button } from 'react-bootstrap';
import { useWeb3 } from "@3rdweb/hooks";

const Lending = () => {
 const { address, provider } = useWeb3();
 const txBuilder = new TxBuilderV2(Network.ropsten, provider);
 const lendingPool = txBuilder.getLendingPool(Market.ropsten);
 const [amount, setAmount] = useState('');
 const [checked, setChecked] = useState(false);
 const [radioValue, setRadioValue] = useState('1');

 const InterestRate = {
    None: 'None',
    Stable: 'Stable',
    Variable: 'Variable',
  }

  const radios = [
    { name: InterestRate.None, value: '1' },
    { name: InterestRate.Stable, value: '2' },
    { name: InterestRate.Variable, value: '3' },
  ];

  function borrow(e) {
      lendingPool.borrow({
          user: "0xb53c1a33016b2dc2ff3653530bff1848a515c8c5",
          amount,
          reserve: "0x1c8756FD2B28e9426CDBDcC7E3c4d64fa9A54728",
         interestRateMode: radioValue,
      });

      e.preventDefault();

  }

   return(
       <div>
            <h1>Your home financing journey begins here</h1>
            <div>
                {address ? (
                    <form>
                    <input type="number" placeholder='Amount' onChange={(e) => setAmount(e.target.value)}/>
        
       
                <ButtonGroup>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
      <Button onClick={borrow}></Button>
      </form>
                ) : (
                    <div>
                        Connect wallet to take out a loan 🏦
                    </div>
                )}
            </div>
       </div>
   )
}

export default Lending;