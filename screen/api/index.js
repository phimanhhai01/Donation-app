import axios from "axios";

export const getListDonate = async () => {
    const response = await axios.get('https://donation-be.herokuapp.com/?fbclid=IwAR1bmFIOnp--EnQEk5ZjVgIY7x2xumwExVcCMF3tv2aXibUlh_z4KxhUwZ4');
    console.log(response.data);
    return response.data;
}

export const createDonate = async (donate) => {
    await axios.post('https://donation-be.herokuapp.com/?fbclid=IwAR1bmFIOnp--EnQEk5ZjVgIY7x2xumwExVcCMF3tv2aXibUlh_z4KxhUwZ4', {
        'amount': donate.amount,
        'paymenttype': donate.type,
        'upvotes': 0
    });
}

export const deleteDonate = async (id) => {
    try{
        await axios.delete(`https://donation-be.herokuapp.com/delete/${id}`);
    }
    catch(e){
        console.log(e.message);
    }
}