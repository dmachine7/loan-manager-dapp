import React from "react";
import { useState } from "react";
import { approveLoan } from "../functions/contract";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ApproveLoan = () => {
  const [borrower, setBorrower] = useState("");
  const [loanIndex, setLoanIndex] = useState("");
  const [success, setSuccess] = useState(null);

  async function approveLoansHelper () {
    const temp = await approveLoan(borrower, loanIndex);
    console.log(temp)
    setSuccess(temp);
  }

  return(
    <div>
      <div className="home-main">
        <div>
          <Card style={{ width: '30vw' }}>
            <Card.Body>
              <Card.Title>How approving loans work ?</Card.Title>
              <Card.Text>
                This function allows the borrower to approve a loan request by passing in their own address and the index of the loan in their loans array. It first checks that the caller is the borrower and then sets the isApproved flag of the Loan struct to true.            
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Borrower address</Form.Label>
            <Form.Control type="text" placeholder="Enter address" onChange={(e) => setBorrower(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Loan chain index</Form.Label>
            <Form.Control type="text" placeholder="Enter your loan index" onChange={(e) => setLoanIndex(e.target.value)} />
          </Form.Group>
          <Button variant="primary" onClick={() => {approveLoansHelper()}}>
            Approve loan
          </Button>
        </Form>
      </div>
      <div>
        {
          success && success != null ? 
          success == true ? 
          <h3>
            Loan approved
          </h3>
          : <h3>
            Loan approval fail
          </h3>
          : null 
        }
      </div>
    </div>
    
  );
}

export default ApproveLoan;