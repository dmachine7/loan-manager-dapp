import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import RequestLoan from './components/RequestLoan';
import 'bootstrap/dist/css/bootstrap.min.css';
import ApproveLoan from './components/ApproveLoan';
import PaybackLoan from './components/PaybackLoan';
import GetLoan from './components/GetLoan';
import { useEffect, useState } from 'react';

export let accountsGlobal = "";

function App() {
  const [accounts, setAccounts] = useState("");

  useEffect(() => {
    // Check if Metamask is installed
    if (typeof window.ethereum !== 'undefined') {
      // Request access to the user's accounts
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(function(accounts) {
          // Metamask is connected, and you can now access the user's accounts
          var account = accounts[0];
          console.log('Connected to Metamask with account:', account);
          setAccounts(account);
          // Use the 'account' variable to interact with the user's wallet
          // For example, you can use web3.js to send transactions or interact with smart contracts
        })
        .catch(function(error) {
          console.error('Error connecting to Metamask:', error);
        });
    } else {
      console.error('Metamask is not installed');
    }
  }, [accounts])

  return (
    <div className="App">
      {
        accountsGlobal = accounts
      }
      <BrowserRouter>
        <header className="header">
          Get Easier Loans
        </header>
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/requestloan' Component={RequestLoan} />
          <Route path='/approveloan' Component={ApproveLoan} />
          <Route path='/paybackloan' Component={PaybackLoan} />
          <Route path='/getloandetails' Component={GetLoan} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
