import React from "react";
import { Form, Button, Container, Row, Col, Table, InputGroup, Modal } from "react-bootstrap";
import { Component, createRef, forwardRef, useEffect, useReducer, useState } from "react";
import { AiFillEdit, AiFillDelete, AiOutlineBorder } from "react-icons/ai";
import '../css/forAddProduct.css'
import Dashboard, { Navigation } from "./navigation";
import { toast } from "react-toastify";
import { addCustomers, custTable, deletCustomers, recivePayment } from "../services/userservices";




export default class AddCustomerClass extends Component {

    render() {
        return <AddCust />
    }
}

function AddCust() {

    const [newData, setData] = useState({})

    const add = (event) => {
        event.preventDefault();

        //validation

        if (newData.custVehicle.trim() == '' || newData.custName.trim() == '' || newData.custPhone.trim() == '') {
            toast.error("All fields are Required.....");
            return;
        }

        if (error.isError) {
            toast.error("Invalid Data.....")
            return;
        }
        console.log(newData);

        //call server api for sending data
        addCustomers(newData).then((resp) => {
            console.log(resp)
            console.log("success")
            toast.success("Customer Created Successfully.... Cust ID " + resp.custId)


            setData({

                custName: '',
                custPhone: '',
                custVehicle: '',
                custCredit: '',
            });

        }).catch((error) => {
            console.log(error)
            console.log("Error")

            //handle errors

            setError({
                errors: error,
                isError: true
            })
        });
        //TableData();
    }


    const [error, setError] = useState({

        errors: {},
        isError: false
    })


    const handleChange = (event, property) => {
        setData({ ...newData, [property]: event.target.value })
    }

    return (
        <>
            <Navigation />
            <Container >
                <Row>
                    <Col>
                        <div className="addProduct">
                            <Form onSubmit={add}  >
                                <Form.Group className="mb-3 ">
                                    <Form.Label>Customer Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter customer Name" name="customerName"
                                        id='custName' onChange={(e) => handleChange(e, 'custName')} value={newData.custName} />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Phone No.</Form.Label>
                                    <Form.Control type="number" placeholder="Phone Number" name="phoneNumber"
                                        id='custPhone' onChange={(e) => handleChange(e, 'custPhone')} value={newData.custPhone} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Vehicle name</Form.Label>
                                    <Form.Control type="text" placeholder="Vehicle Name" name="address"
                                        id='custVehicle' onChange={(e) => handleChange(e, 'custVehicle')} value={newData.custVehicle} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Credit</Form.Label>
                                    <Form.Control type="number" placeholder="Customer Credit" name="credit"
                                        id='custCredit' onChange={(e) => handleChange(e, 'custCredit')} value={newData.custCredit} />
                                </Form.Group>

                                <Button variant="secondary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </div>
                    </Col>
                    <Col>

                        <TableData onDataEdit={(d) => { setData(d) }} />
                    </Col>
                </Row>

            </Container>
        </>
    )
}


  

function TableData(props) {
    const [data, getData] = useState([])
    // const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        custTable().then((response) => {
            getData(response);
        })
        // forceUpdate()

    }
    const editCustomer = (index) => {
        const row = [...data];
        // console.log(index)
        // console.log("delete clicked "+JSON.stringify(row));
        //   row.splice(index, 1)
        let editById = JSON.parse(JSON.stringify(row));
        console.log(editById[index]);
        //setData(editById[index]);
        props.onDataEdit(editById[index]);
    }

    function refreshPage() {
        window.location.reload(false);
      }
      
    const deleteCustomer = (index) => {

        const row = [...data];
        // console.log(index)
        // console.log("delete clicked "+JSON.stringify(row));
        //   row.splice(index, 1)
        let deleteById = JSON.parse(JSON.stringify(row));
        console.log("delete clicked " + deleteById[index].custId);

        deletCustomers(deleteById[index].custId)

        refreshPage() 


        getData(data.slice(index, 1))
     
    }

    const fetchData1 = () => {
        custTable().then((response) => {
            // getData(response);
            if (JSON.stringify(response) != JSON.stringify(data)) {
                getData(response)
            }
        });
    }
    // for modal hooks

    let payment
    const [payCustId, setPayCustId] = useState([])

    const [show, setShow] = useState(false);
    const recivePmt = () =>{
         setShow(false);
        console.log(payment);
        console.log(payCustId);
        recivePayment(payCustId,payment).then((response) => {})
        console.log("Done");
        refreshPage() 
      
        
    }

    const handleClose = () =>{
        setShow(false);
       
   }
    const handleShow = (index) => { 
        console.log(index)
         const row = [...data];
         let id = JSON.parse(JSON.stringify(row));
         console.log(id[index])
 
         console.log(id[index].custId);

         setPayCustId(id[index].custId)

         console.log(payCustId);
         

        setShow(true);
        

    }

    const handleChange = (event) => {

        payment = event.target.value;
      
    }

    return (
        <>
            {fetchData1()}
            <Table className='mt-5' striped bordered hover  >

                <tbody>
                    <tr>
                        <th>Cust Id</th>
                        <th>Customer Name</th>
                        <th>Phone Number</th>
                        <th>Vehicle name</th>
                        <th>Credit</th>
                        <th> Payment</th>
                        <th>Edit / Delete</th>

                    </tr>
                    {data.map((item, i) => (
                        <tr key={i}>
                            <td >{item.custId}</td>
                            <td>{item.custName}</td>
                            <td>{item.custPhone}</td>
                            <td>{item.custVehicle}</td>
                            <td>{item.custCredit}</td>
                            <td> <div className=" ">

                                <Button variant="primary my-0" onClick={() => (handleShow(i))}>
                                Recive
                                </Button>

                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Recive Payment</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <InputGroup className="mb-3 my-3">
                                            <Form.Control type="number"   placeholder="Enter Amount"  aria-label="customer" onChange={(e) => handleChange(e)}/>
                                            <Button variant="success" id="button-addon1">
                                                Recive 
                                            </Button>
                                        </InputGroup>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={recivePmt} >
                                            Save Changes
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                            </td>
                            <td>
                                <button style={{ border: "0px", fontSize: "26px" }} onClick={() => (editCustomer(i))}>< AiFillEdit style={{ color: 'black', margin: "1px" }} /></button>
                                <button style={{ border: "0px", fontSize: "26px" }} onClick={() => (deleteCustomer(i))}>< AiFillDelete style={{ color: 'red', margin: "1px" }} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>



        </>
    );
}

