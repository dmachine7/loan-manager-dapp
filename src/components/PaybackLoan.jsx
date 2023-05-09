import React from "react";
import { useState } from "react";
import { payBackLoan } from "../functions/contract";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const PaybackLoan = () => {
  const [amount, setAmount] = useState("");
  const [borrower, setBorrower] = useState("");
  const [loanIndex, setLoanIndex] = useState("");
  const [success, setSuccess] = useState(null);

  async function paybackLoansHelper () {
    const temp = await payBackLoan(borrower, loanIndex, amount);
    console.log(temp)
    setSuccess(temp);
  }

  return(
    <div>
      <div className="home-main">
        <div>
          <Card style={{ width: '30vw' }}>
            <Card.Body>
              <Card.Title>How paying back loans work ?</Card.Title>
              <Card.Text>
                This function allows the borrower to pay back a loan by passing in their own address and the index of the loan in their loans array. It first checks that the caller is the borrower, that the loan has been approved, and that the loan has not already been paid back. It then checks that the amount of Ether sent with the transaction is sufficient to pay back the loan. If it is, the isPaidBack flag of the Loan struct is set to true, and any excess Ether sent is refunded to the borrower.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Payback amount</Form.Label>
            <Form.Control type="text" placeholder="Enter amount" onChange={(e) => setAmount(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Borrower address</Form.Label>
            <Form.Control type="text" placeholder="Enter address" onChange={(e) => setBorrower(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Loan chain index</Form.Label>
            <Form.Control type="text" placeholder="Enter your loan index" onChange={(e) => setLoanIndex(e.target.value)} />
          </Form.Group>
          <Button variant="primary" onClick={() => {paybackLoansHelper()}}>
            Pay back loan
          </Button>
        </Form>
      </div>
      <div>
        {
          success && success != null ? 
          success == true ? 
          <h3>
            Your loan has been paid
          </h3>
          : <h3>
            Your loan payback failed
          </h3>
          : null 
        }
      </div>
    </div>
    
  );
}

export default PaybackLoan;