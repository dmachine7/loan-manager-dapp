import React from "react";
import { useState } from "react";
import { getLoans } from "../functions/contract";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

const GetLoan = () => {
  const [borrower, setBorrower] = useState("");
  const [loans, setLoans] = useState([]);

  async function getLoansHelper () {
    const temp = await getLoans(borrower);
    setLoans(temp);
  }

  return(
    <div>
      <div className="home-main">
        <div>
          <Card style={{ width: '30vw' }}>
            <Card.Body>
              <Card.Title>Getting loan details</Card.Title>
              <Card.Text>
                This function allows anyone to view a borrower's loans by passing in the borrower's address as a parameter. It returns an array of Loan structs associated with that borrower's address.            
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter address to get loan details</Form.Label>
            <Form.Control type="text" placeholder="Enter address" onChange={(e) => setBorrower(e.target.value)} />
          </Form.Group>
          <Button variant="primary" onClick={() => {getLoansHelper()}}>
            Get loan details
          </Button>
        </Form>
      </div>
      {
        loans && loans.length > 0 ? 
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Loan Index</th>
                <th>Amount</th>
                <th>Interest Rate</th>
                <th>Duration</th>
                <th>Start Date</th>
                <th>Approved</th>
                <th>Paid</th>
              </tr>
            </thead>
            <tbody>
              {
                loans && loans.map((item, key) => {
                  return (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{item && item["amount"]}</td>
                      <td>{item && item["interestRate"]}</td>
                      <td>{item && item["duration"]}</td>
                      <td>{item && item["startDate"] ? new Date(item["startDate"]*1000).toDateString() : null}</td>
                      <td>{item && item["isApproved"] && item["isApproved"] == true ? "Yes" : "No"}</td>
                      <td>{item && item["isPaidBack"] && item["isPaidBack"] == true ? "Yes" : "No"}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </div> 
        : null
      }
    </div>
  );
}

export default GetLoan;