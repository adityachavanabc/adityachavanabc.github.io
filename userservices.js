import { myAxios } from "./helper";

export const signUp = (user) => {

    return myAxios.post("/user", user).then ((response) => response.data)
};

export const login = (loginData) => {

    return myAxios.get("/user/"+ loginData.userName + "/" + loginData.password).then ((response) => response.data)
};

export const userById = (id) => {

    return myAxios.get("/user/"+ id).then ((response) => response.data)
};

export const custById = (id) => {

    return myAxios.get("/customer/"+ id).then ((response) => response.data)
};

export const addCustomers = (data, id) =>  {
    if(id == null){
    return myAxios.post("/customer", data).then ((response) => response.data)
    }
    else{
    return myAxios.put("/customer/" + id, data).then ((response) => response.data)
    }
};

export const custTable = () => {

    return myAxios.get("/customer").then ((response) => response.data)
};


export const deletCustomers = (id) =>  {
    return myAxios.delete("/customer/" + id).then ((response) => response)
};
 

export const prodTable = () => {

    return myAxios.get("/product").then ((response) => response.data)
};


export const addProduct = (data, id) =>  {
    if(id == null){
    return myAxios.post("/product", data).then ((response) => response.data)
    }
    else{
    return myAxios.put("/product/" + id, data).then ((response) => response.data)
    }
};

export const deletProduct = (id) =>  {
    return myAxios.delete("/product/" + id).then ((response) => response)
};

// for printing bill 

export const bill = () => {

    return myAxios.get("/bill").then ((response) => response.data)
};

export const recivePayment = (custId, payment) => {

    return myAxios.put("/customer/takepayment/"+custId+"/"+payment).then ((response) => response.data)
};

export const totalReceive = () => {

    return myAxios.get("/customer/totalCredit").then ((response) => response.data)
};



export const sendBill = (data) =>  {
   
    return myAxios.post("/bill", data).then ((response) => response.data)
    
};

export const updateQty = (prodId, qty) => {

    return myAxios.put("/product/"+prodId+"/"+qty).then ((response) => response.data)
};

export const updateQtyAdd = (prodId, qty) => {

    return myAxios.put("/product/add/"+prodId+"/"+qty).then ((response) => response.data)
};

