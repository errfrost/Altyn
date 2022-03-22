import {React, useState, useEffect} from 'react';
import {ethers} from 'ethers';
import NumberFormat from 'react-number-format';
import styles from './Altyn.module.css';
import altyn_abi from './Altyn.json';
import presale_abi from './AltynIDO.json';

const Altyn = () => {

  // deploy simple token contract and paste deployed contract address here. This value is local ganache chain
//	let contractAddress = '0x1c37b3E1ee87974bcfbf8a4BC4B652BCe20Fe12b';
//	let presaleContractAddress = '0x22DA5df5CdD8F7035797162FdC0c55E99D33D957';

	let contractAddress = '0x01BfdD2E8fFb611D2c8ac80B89413ecd26229f84';
	let presaleContractAddress = '0xaf4f44742e5648b6c058c7c76b51b75b5fa7b1bd';

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect MetaMask');

	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [contract, setContract] = useState(null);
	const [contractSale, setContractSale] = useState(null);

	const [tokenName, setTokenName] = useState("Token");
	const [balance, setBalance] = useState(null);
	const [transferHash, setTransferHash] = useState(null);

	const [swapFrom, setSwapFrom] = useState(0);
	const [swapTo, setSwapTo] = useState(0);
	const [swapAmount, setSwapAmount] = useState(0);

	const [saleRate, setSaleRate] = useState(0.00025);

	const withdraw = async (e) => {
		e.preventDefault();
		let txt = await contractSale.withdraw();
		console.log(txt);
	}

	const minter = async (e) => {
		e.preventDefault();
		let txt = await contract.setPreSaleContract(presaleContractAddress);
		console.log(txt);
	}

	const swap = async (e) => {
		if (contractSale == null) {
			setErrorMessage('Connect to Metamask');
			return;
		}

		let amount = parseInt(swapFrom * Math.pow(10, 18)).toString();//BigInt(parseInt(swapFrom * Math.pow(10, 18)));

		let txt = await contractSale.preSale({
            from: defaultAccount,
            value: amount//, //принимается в wei
						//gasLimit: 1000000
          });

		console.log(txt);
		setTransferHash("Transfer confirmation hash: " + txt.hash);
  }

	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
			})
			.catch(error => {
				setErrorMessage('Connect to MetaMask');
			});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

	// update account, will cause component re-render
	const accountChangedHandler = (newAccount) => {
		console.log('accountChangedHandler');
		if (Array.isArray(newAccount))
			{
				setDefaultAccount(newAccount[0]);
			}
		else
			{
				setDefaultAccount(newAccount);
			}
		updateEthers();
    setConnButtonText(newAccount.toString());
	}

  const changeNetwork = () => {
    //this function trying to change Network to BSC Mainnet
/*    window.ethereum.request({
      method: 'wallet_switchEthereumChain',
//      params: [{ chainId: '0x38' }] //56 в десятичной - BSC MainNet
			params: [{ chainId: '0x61' }] //97 в десятичной - BSC TestNet
    })
    .then(result => {
      console.log('network changed to BSC');
    })
    .catch(error => {
      setErrorMessage(error.message);
      console.log(error.message);
    });
*/
  }

	const chainChangedHandler = (chainId) => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	}

	const updateEthers = () => {
		let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
		setProvider(tempProvider);

		let tempSigner = tempProvider.getSigner();
		setSigner(tempSigner);

		let tempContract = new ethers.Contract(contractAddress, altyn_abi.abi, tempSigner);
		setContract(tempContract);

		let tempContractSale = new ethers.Contract(presaleContractAddress, presale_abi.abi, tempSigner);
		setContractSale(tempContractSale);
	}


	/*
  useEffect(() => {
     let tmp = window.localStorage.getItem('connButtonText');
     if (tmp != null) {
       setConnButtonText(tmp);
     }
   }, []);

  useEffect(() => {
      window.localStorage.setItem('connButtonText', connButtonText);
    }, [connButtonText]);
*/
	const getRate = async (e) => {
		if (e) e.preventDefault();
		console.log('getRate');
		let txt = await contractSale.getRate();
		let txtNumber = txt.toNumber();
		console.log(1/txtNumber);
		setSaleRate(1/txtNumber);
		return txtNumber;
	}

	const setRate = async (e) => {
		e.preventDefault();
		console.log('setRate 4000-start');
		let txt = await contractSale.setRate(3000);
		console.log(txt);
		console.log('setRate 4000-finish');
	}

	const recalcRate = async (values, sourceInfo) => {
		const {event, source} = sourceInfo;

		if (event == null) return;

		if (event.target.id == 'amount')
			{
				let newValue = values.floatValue / saleRate;
				setSwapFrom(values.floatValue);
				setSwapTo(newValue);
			}
		else if (event.target.id == 'remount')
			{
				let newValue = values.floatValue * saleRate;
				setSwapTo(values.floatValue);
				setSwapFrom(newValue);
			}
	}

	// listen for account changes
	if (window.ethereum)
		{
			window.ethereum.on('accountsChanged', accountChangedHandler);
			window.ethereum.on('chainChanged', (_chainId) => chainChangedHandler(_chainId));
		}

	useEffect(() => {
		if (contractSale != null) {
			getRate();
		}
	}, [contractSale]);

	/*
	<form onSubmit={setRate}>
		<button type='submit'>Set Rate</button>
	</form>
	<form onSubmit={getRate}>
		<button type='submit'>get Rate</button>
	</form>
	<form onSubmit={minter}>
		<button type='submit'>minter</button>
	</form>
	<form onSubmit={withdraw}>
		<button type='submit'>withdraw</button>
	</form>
	<form onSubmit={withdraw}>
		<button type='submit'>withdraw</button>
	</form>
	<form onSubmit={minter}>
		<button type='submit'>minter</button>
	</form>
	*/
  return (
    <div className={styles.main}>

      <div className={styles.header}>
        <div className={styles.header__wrapper}>
          <div></div>
          <div className={styles.header__logo}>
            <a href="#" className={styles.x1}>
              <img className={styles.logoT} src={require('./img/altyn-coin.png')} />
            </a>
          </div>

          <div className={styles.header__connect_btn} onClick={connectWalletHandler}>
            <div className={styles.onlinemarker2} style={{display: "block"}}></div>
            <button id="wallet" className={styles.x3} onClick={connectWalletHandler}>{connButtonText}</button>
          </div>

        </div>

      </div>

      <div className={styles.swap__container}>
        <div className={styles.MainDescriptor}></div>

        <div className={styles.swap__mainfield}>
          <div className={styles.badge}>SWAP</div>

          <div className={styles.swap__header}>
            <div className={styles.swap__header__line}>

              <div className={styles.swap__header__line__title}>
                <a href="#" className={styles.x5}>
                  <div className={styles.network}>
                    <img src={require('./img/bsc.png')} className={styles.x6} />
                      Binance Smart Chain Mainnet
                  </div>
                </a>
              </div>

            </div>
          </div>

          <div id="swap-page" className={styles.swap__page}>
            <div className={styles.swap__page__container}>
              <div>
                <div id="swap-currency-input" label="[object Object]" className={styles.swap__curr__input__container}>
                  <div>
                    <div className={styles.swap__curr__input__line} id="swapFieldOne">
                      <div className={styles.swapTopLine}>From</div>

                      <button className={styles.swapp_curr__inbutBTN}>
                        <div id="fromSwapToken">
                          <div className={styles.swap__curr__input__line__nametoken}>
                            <img src={require('./img/bnb.png')} />
                            <span className={styles.nameToken}>BNB</span>
                          </div>
                        </div>
                      </button>

											<NumberFormat id="amount" className={styles.swap__curr__token__input} thousandSeparator={' '} allowNegative={false} onValueChange={recalcRate} value={swapFrom} />
                    </div>
                  </div>

                  <div className={styles.swap__curr_area_info}></div>
                </div>

                <div className={styles.swapp_changer}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8F96AC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <polyline points="19 12 12 19 5 12"></polyline>
                  </svg>
                </div>

                <div id="swap-currency-output" label="[object Object]" className={styles.swap__curr__input__container}>
                  <div>
                    <div className={styles.swap__curr__input__line} id="swapFieldTwo">
                      <div className={styles.swapTopLine}>To</div>

                      <button className={styles.swapp_curr__inbutBTN}>
                        <div id="tokenPlace">
                          <div id="toSwapToken" className={styles.swap__curr__input__line__nametoken}>
                            <img src={require('./img/altyn-coin-mini.png')} />
                            <span className={styles.nameToken}>ALTYN</span>
                          </div>
                        </div>
                      </button>

											<NumberFormat id="remount" className={styles.swap__curr__token__input} thousandSeparator={' '} allowNegative={false} onValueChange={recalcRate} value={swapTo} />
					          </div>
				          </div>

				          <div className={styles.swap__curr_area_info}></div>
				        </div>
			        </div>

			        <div className={styles.x7}>1 ALTYN ~ {saleRate} BNB</div>

      			  <div className={styles.swap__connect}>
        				<button id="swapBtnr" onClick={swap} className={styles.Approve}>
        				  Approve
        				</button>
      			  </div>

			        <div className={styles.change__container}>
				        <div id="StatusPush">ALTYN BSC address - {contractAddress}</div>
                <div id="errMessage"></div>
			        </div>
			      </div>
		      </div>
		    </div>

      </div>

      <div className={styles.footer}>
        <br/>
        <div className={styles.footerDescriptor}>
          Copyright © 2022 &nbsp;<span style={{color: '#d3980e'}}> <b>Altyn Coin</b>.</span> &nbsp;All Rights Reserved
        </div>
      </div>

    </div>
  )
}

export default Altyn;
