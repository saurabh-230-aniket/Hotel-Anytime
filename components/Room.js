import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom'


function Room({ room, fromdate, todate}) {


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    return (
        <div className='row bs'>
            <div className='col-md-4'>
                <img src={room.imageurls[0]} className='smallimg'></img>
            </div>
            <div className='col-md-7'>
                <h1>{room.name}</h1>
                <p><b>Max count: </b>{room.maxcount}</p>
                <p><b>Phone Number: </b>{room.phonenumber}</p>
                <p><b>Type: </b>{room.type}</p>

                <div style={{ float: 'right' }}>
                    {(fromdate && todate && <Link to={`/${room._id}/${fromdate}/${todate}`}>
                        <button className='btn btn-primary m-2'>Book Now</button>
                    </Link>)}
                    
                    <button className='btn btn-primary ' onClick={handleShow}>View Details</button>
                </div>
            </div>
        

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header   >
                    <Modal.Title>{room.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Carousel prevLabel='' nextLabel=''>
                        {room.imageurls.map(url => {
                            return (
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={url}
                                        alt="First slide"
                                    />
                                </Carousel.Item>
                            )
                        })}
                    </Carousel>
                    <p>{room.description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Room;