import { Form, Button, Container, Row, Col, Table } from "react-bootstrap";
import React, { useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import '../css/forAddProduct.css'
import Navigation from "./navigation";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Component } from "react";
import { addProduct, deletProduct, prodTable } from "../services/userservices";

export default class Product extends Component {

    render() {
        return <AddProd />
    }
}


function AddProd() {

    const [newData, setData] = useState({})

    const add = (event) => {
        event.preventDefault();

        //validation

        if (newData.prodName == '' || newData.quantity == '' || newData.purPrice == '' || newData.selPrice == '') {
            toast.error("All fields are Required.....");
            return;
        }

        if (error.isError) {
            toast.error("Invalid Data.....")
            return;
        }
        console.log(newData);

      
        //call server api for sending data
        addProduct(newData).then((resp) => {
            console.log(resp)
            console.log("success")
            toast.success("Product Added Successfully.... Prod ID " + resp.prodId)

            setData({

                prodName: '',
                quantity: '',
                purPrice: '',
                selPrice: '',
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
            <Container>
                <Row>
                    <Col><div className="addProduct">
                        <Form onSubmit={add} >
                            <Form.Group className="mb-3 ">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Product Name" name="productName" 
                                 id='prodName' onChange={(e) => handleChange(e, 'prodName')} value={newData.prodName}/>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Purchase Price</Form.Label>
                                <Form.Control type="number" placeholder="Purchase Price" name="purchasePrice" 
                                 id='purPrice' onChange={(e) => handleChange(e, 'purPrice')} value={newData.purPrice}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Selling Price</Form.Label>
                                <Form.Control type="number" placeholder="Selling Price" name="sellingPrice" 
                                 id='selPrice' onChange={(e) => handleChange(e, 'selPrice')} value={newData.selPrice}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control type="number" placeholder="total numbers" name="quantity" 
                                 id='quantity' onChange={(e) => handleChange(e, 'quantity')} value={newData.quantity}/>
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>
                    </Col>
                    <Col>
                <TableData onDataEdit={(d)=>{setData(d)}}/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

function TableData(props) {
    const [data, getData] = useState([])
        
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = () => {
        prodTable().then((response) => {
            getData(response);
        })

    }
    const editProduct = (index) =>{
        const row = [...data];
        let editById = JSON.parse(JSON.stringify(row));
        console.log(editById[index]);
        props.onDataEdit(editById[index]);
    }

    const deleteProduct = (index) =>{

        const row = [...data];
        let deleteById = JSON.parse(JSON.stringify(row));
        console.log("delete clicked "+deleteById[index].prodId);

        deletProduct(deleteById[index].prodId)
        
        getData(data.slice(index, 1))
        fetchData()
        fetchData()
    }

    const fetchData1 = () => {
        prodTable().then((response) => {
           if (JSON.stringify(response) != JSON.stringify(data)) {
                getData(response)
           }
        });
    }

    return (
        <>
        {fetchData1()}
            <Table striped bordered hover className="mt-5">

                <tbody>
                    <tr>
                        <th>Prod Id</th>
                        <th>Product Name</th>
                        <th>Purchase Price</th>
                        <th>Selling Price</th>
                        <th>Quantity</th>
                        <th>Edit / Delete</th>

                    </tr>
                    {data.map((item, i) => (
                        <tr key={i}>
                            <td>{item.prodId}</td>
                            <td>{item.prodName}</td>
                            <td>{item.purPrice}</td>
                            <td>{item.selPrice}</td>
                            <td>{item.quantity}</td>
                            <td>
                                <button style={{border: "0px", fontSize: "25px"}}  onClick={()=>(editProduct(i))}>< AiFillEdit style={{ color: 'black', marginRight: 15, marginLeft: 15 }}/></button>
                                <button style={{border: "0px", fontSize: "25px"}}  onClick={()=>(deleteProduct(i))}>< AiFillDelete style={{ color: 'red', marginRight: 15, marginLeft: 15 }} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );

   

}


