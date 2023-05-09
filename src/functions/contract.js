import Web3 from "web3";
import { accountsGlobal } from "../App";

// Initialize the Web3 object
// const web3 = new Web3("https://eth-sepolia.g.alchemy.com/v2/78u91OSOKwLEZIFJY30_oXc5nFckSXdC");
const web3 = new Web3(window.ethereum);

// Load the contract ABI and address
const abi = [ 
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "borrower",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "loanIndex",
                "type": "uint256"
            }
        ],
        "name": "approveLoan",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "borrower",
                "type": "address"
            }
        ],
        "name": "getLoans",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "interestRate",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "duration",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "startDate",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "borrower",
                        "type": "address"
                    },
                    {
                        "internalType": "bool",
                        "name": "isApproved",
                        "type": "bool"
                    },
                    {
                        "internalType": "bool",
                        "name": "isPaidBack",
                        "type": "bool"
                    }
                ],
                "internalType": "struct LoanManagementSystem.Loan[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "loans",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "interestRate",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "duration",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "startDate",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "borrower",
                "type": "address"
            },
            {
                "internalType": "bool",
                "name": "isApproved",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "isPaidBack",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "borrower",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "loanIndex",
                "type": "uint256"
            }
        ],
        "name": "payBackLoan",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "interestRate",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "duration",
                "type": "uint256"
            }
        ],
        "name": "requestLoan",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
 ];

// contract address
const address = '0x5eAb53eDd4a74DdbAe8C0dF99f5265bF10f2d531';

// Create an instance of the contract
const contract = new web3.eth.Contract(abi, address);

export async function requestLoan(amount, interestRate, duration) {
  const accounts  = accountsGlobal;
  let flag = false;
  if (accounts) {
    try {
      // const accounts = await web3.eth.getAccounts();
      await contract.methods.requestLoan(amount, interestRate, duration).send({ from: accounts });
      console.log('Loan request successful!');
      flag = true;
    } catch (error) {
      console.error('Loan request failed:', error);
    }
  } else {
    console.log("Account not detected");
  }

  return flag;
}

// Approve a loan
export async function approveLoan(borrower, loanIndex) {
  let flag = false;
  try {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.approveLoan(borrower, loanIndex).send({ from: accounts[0] });
    console.log('Loan approval successful!');
    flag = true;
  } catch (error) {
    console.error('Loan approval failed:', error);
  }
  return flag;
}

// Pay back a loan
export async function payBackLoan(borrower, loanIndex, amount) {
  let flag = false;
  try {
    const accounts = await web3.eth.getAccounts();
    await contract.methods.payBackLoan(borrower, loanIndex).send({ from: accounts[0], value: amount });
    console.log('Loan payment successful!');
    flag = true;
  } catch (error) {
    console.error('Loan payment failed:', error);
  }
  return flag;
}

// Get loans for a borrower
export async function getLoans(borrower) {
  try {
    const loans = await contract.methods.getLoans(borrower).call();
    console.log('Loans for', borrower, ':', loans);
    return loans;
  } catch (error) {
    console.error('Failed to get loans:', error);
  }
}