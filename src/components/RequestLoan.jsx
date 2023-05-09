import React from "react";
import { useState, useEffect } from "react";
import { requestLoan } from "../functions/contract";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const RequestLoan = () => {
  const [amount, setAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [duration, setDuration] = useState("");
  const [success, setSuccess] = useState(null);

  async function requestLoansHelper () {
    const temp = await requestLoan(amount, interestRate, duration);
    console.log(temp)
    setSuccess(temp);
  }

  return(
    <div>
      <div className="home-main">
        <div>
          <Card style={{ width: '30vw' }}>
            <Card.Body>
              <Card.Title>How requesting loans work ?</Card.Title>
              <Card.Text>
                This function allows a borrower to request a loan by passing in the loan amount, interest rate, and duration as parameters. It first checks that the loan parameters are valid and then creates a new Loan struct with the provided information. This Loan struct is then added to the loans mapping under the borrower's address.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Amount needed</Form.Label>
            <Form.Control type="text" placeholder="Enter amount" onChange={(e) => setAmount(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Interest rate</Form.Label>
            <Form.Control type="number" placeholder="Enter interest rate" onChange={(e) => setInterestRate(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Duration</Form.Label>
            <Form.Control type="text" placeholder="Enter time in years" onChange={(e) => setDuration(e.target.value)} />
          </Form.Group>
          <Button variant="primary" onClick={() => {requestLoansHelper()}}>
            Send loan request
          </Button>
        </Form>
      </div>
      <div>
        {
          success && success != null ? 
          success == true ? 
          <h3>
            Your request has been successful
          </h3>
          : <h3>
            Your request has failed
          </h3>
          : null 
        }
      </div>
    </div>
    
  );
}

export default RequestLoan;