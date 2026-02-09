import axios from 'axios';

const BASE_URL = 'http://localhost:5056'  // burası benim .net projemin çalıştığı port

{/* Bu Summary kısmı bize toplam bakiye gelir gider ve net geliri getirecek */}
export const getSummary = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/Dashboard/summary`);
    return response.data;
  } catch (error) {
    console.error('Error fetching summary:', error);
    throw error;
  }
}
{/* Bu Transaction kısmı ise bize yapılan işlemin bilgilerini getirir işte ıd title kategori falan fistan */}
export const getTransactions = async() =>{
    try{
        const response = await axios.get(`${BASE_URL}/api/Dashboard/transactions`);
        return response.data;
    }
    catch(error){
        console.error('Error fetching transactions:', error);
        throw error;
    }

}
export const createLinks = async(linkData) =>{
    try{
        const response = await axios.post(`${BASE_URL}/api/Link/create`, linkData);
        return response.data;
    }
    catch(error){
        console.error('Error creating links:', error);
        throw error;
    }
} 
export const getLinks = async() =>{
    try{
        const response = await axios.get(`${BASE_URL}/api/Link/list`);
        return response.data;
    }
    catch(error){
        console.error('Error fetching links:', error);
        throw error;
    }
}