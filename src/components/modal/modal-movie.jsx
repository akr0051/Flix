// import React from 'react';
// import axios from 'axios';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import Modal from 'react-bootstrap/Modal';
// import { Button, Container } from 'react-bootstrap';
// import { setHideModal, setOpenModal } from '../../actions/actions';
// import { ModalDir } from '../modal/modal-director';
// import { GenreView } from '../genre-view/genre-view';
// import { AiOutlineHeart } from 'react-icons/ai';

// export class ModalMovie extends React.Component {
//     constructor (props) {
//         super(props)
//         this.state = {
//                 isOpen: false
//         }
//         this.handleOpenModal = this.handleOpenModal.bind(this);
//     }
        
    
    
//     handleOpenModal = () => {
//         this.setState({
//             isOpen: true 
//         });
//     }

//     handleCloseModal = () => {
//         this.setState({ 
//             isOpen: false 
//         });
//     }

//     addFavorite(movie) {
//         const token = localStorage.getItem('token');
//         const url = 'https://flix0051.herokuapp.com/users/' + localStorage.getItem('user') + '/Movies/' + movie._id;

//         axios.post(url, "", {
//             headers: {Authorization: `Bearer ${token}`}
//         })
//         .then(response => {
//             alert("Movie has been added to favorites.");
//             this.props.setProfile(response.data);
//         })
//         .catch(function (error) {
//             console.log(error);
//         })
//     }    
    
    
//     render() {
//         const { movie } = this.props;

//         return (
//             <Container><div
//                      className="d-flex align-items-center justify-content-center"
//                       style={{ height: "100vh" }}
//                     >
//                       <Button variant="primary" onClick={this.handleOpenModal}>
//                         Read More
//                       </Button>
//                     </div>
//                     <Modal backdrop="static" show={this.state.isOpen} onHide={this.handleCloseModal}>
//                       <Modal.Header closeButton>
//                         <Modal.Title ></Modal.Title>
//                       </Modal.Header>
//                       <Modal.Body> 
//                          <AiOutlineHeart variant="link" onClick={() => this.addFavorite(movie)} />
//                         Description
                        
//                       </Modal.Body>
//                       <Modal.Footer>
//                       Director      Genre
//                       <ModalDir/><GenreView/>
//                       </Modal.Footer>
//                     </Modal>
                
//               </Container>
//         )}
//     }

//     export default ModalMovie;


    // className="img" variant="top" src={movie.ImagePath}

    // {movie.Genre}
    //                     {movie.Title}

    //                     {movie.Description}