import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.JPEG';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import '../../src/index.css';

const LogoContainer = styled.div`
  display: flex-left;
  align-items: center;
  border-radius: 10px;
`;

const Tagline = styled.div`
  font-size: 24px;
  text-align: center;
  background-color: #382023;
  padding: 5px;
  color: #d2b48c;
  border-radius: 20px;
  white-space: pre;
  margin: 0px;
`;

const LogoImage = styled.img`
  // width: 50%;
  display: flex-left;
  height: auto;
  padding: 0;
  border-radius: 50px;
`;

const Button = styled.button`
  background-color: #d2b48c;
  color: #8b4513;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin: 5px;
  width: 100%;
  box-sizing: border-box;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;

const Div = styled.div`
  width: calc(40%);
  margin: 10px 50px;
  // display: flex;
  // flex-wrap: wrap;
  justify-content: center;
`;

const Modal = styled.div`
  display: ${({ $show }) => ($show ? 'block' : 'none')};
  position: sticky;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 20%;
  // overflow: auto;
  background-color: #03212e;
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 600px;
`;

const CloseButton = styled.span`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  &:hover,
  &:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <nav className="navbar">
        <LogoContainer>
          <LogoImage src={logo} alt="Logo" />
        </LogoContainer>
        <ButtonGroup>
          <Div>
            <Link to="/" className="menuButton">Home</Link>
          </Div>
          {Auth.loggedIn() ? (
            <>
              <Div>
                <Link to="/dashboard" className="menuButton">Dashboard</Link>
              </Div>
              <Div>
                <button onClick={() => Auth.logout()} className="menuButton">Logout</button>
              </Div>
            </>
          ) : (
            <>
              <Div>
                <Link to="/signup" className="menuButton">Signup</Link>
              </Div>
              <Div>
                <Link to="/login" className="menuButton">Login</Link>
              </Div>
            </>
          )}
          <Div>
            <Button onClick={toggleModal} className="menuButton">About</Button>
          </Div>
        </ButtonGroup>
      </nav>
      <Tagline>
        The place to spill the tea...{"\n"}or coffee!
      </Tagline>
      <Modal $show={showModal}>
        <ModalContent>
          <CloseButton onClick={toggleModal}>&times;</CloseButton>
          <h2>About BeanBanter</h2>
          <p>
            Welcome to BeanBanter, your go-to app for tracking and rating coffee shops. 
            Join us to discover new favorites and share your experiences with the community.
          </p>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Navbar;
