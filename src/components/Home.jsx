import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../style/Home.css'

const Home = () => {
  return (
    <div>
      <div className="home-main">
        <div>
          <Card style={{ width: '30vw' }}>
            <Card.Body>
              <Card.Title>Loan Manager</Card.Title>
              <Card.Text>
                Our Loan Manager is built on blockchain which makes it a decentralized loan market with easier and transparent transactions.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="home-buttons">
          <Button variant="primary" size="lg" href="/requestloan">
            Request Loan
          </Button>
          <hr/>
          <Button variant="primary" size="lg" href="/getloandetails">
            Get Loan Details
          </Button>
          <hr/>
          <Button variant="primary" size="lg" href="/approveloan">
            Approve Loan
          </Button>
          <hr/>
          <Button variant="primary" size="lg" href="/paybackloan">
            Pay Back Loan
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Home;