import {React, useState, useEffect} from 'react';
import styles from './Altyn.module.css';

const IDOhelp = () => {

  return (
    <div className={styles.main}>

      <div className={styles.header}>
        <div className={styles.header__wrapper}>
          <div></div>
          <div className={styles.header__logo}>
            <a href="/" className={styles.x1}>
              <img className={styles.logoT} src={require('./img/altyn-coin.png')} />
            </a>
          </div>
        </div>

      </div>

      <div className={styles.swap__container}>
        <h1>4 simple steps to get Altyn Coin</h1>
        <div className={styles.howto}>
          <h3>Click on the Connect MataMask button</h3>
          <img src={require('./img/howto1.png')} />
          <h3>Enter password and choose Binance Smart Chain MainNet account</h3>
          <img src={require('./img/howto2.png')} />
          <h3>Enter the amount of Altyn Coin you want to buy and click Approve button. You must have enough BNB in your wallet.</h3>
          <img src={require('./img/howto3.png')} />
          <h3>Confirm transaction in MetaMask. Now you have Altyn Coin.</h3>
          <img src={require('./img/howto4.png')} />
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

export default IDOhelp;
