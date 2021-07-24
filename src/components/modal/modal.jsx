import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import { Button, Container } from 'react-bootstrap';
import { setHideModal, setOpenModal } from '../../actions/actions';

export class Modal extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
                isOpen: false
        }
        this.handleOpenModal = this.handleOpenModal.bind(this);
    }
        
    
    
    handleOpenModal = () => {
        this.setState({
            isOpen: true 
        });
    }

    handleCloseModal = () => {
        this.setState({ 
            isOpen: false 
        });
    }
    
    
    render() {
        return (
            <Container><div
                     className="d-flex align-items-center justify-content-center"
                      style={{ height: "100vh" }}
                    >
                      <Button variant="primary" onClick={this.handleOpenModal}>
                        Director
                      </Button>
                    </div>
                    <Modal backdrop="static" show={this.state.isOpen} onHide={this.handleCloseModal}>
                      <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseModal}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                
              </Container>
        )}
    }

    export default Modal;
