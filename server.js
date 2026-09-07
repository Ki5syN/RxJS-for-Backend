import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import * as crypto from "crypto";
import { faker } from '@faker-js/faker';

const app = express();
const port = process.env.PORT || 7071;  

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');  
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.use(bodyParser.json());

function createRandomUser() {
  return {         
      "id": faker.string.uuid(),
      "from": faker.internet.email(),
      "subject": `Hello from Anya + ${faker.internet.username()}`,
      "body": "Long message body here" ,
      "received": faker.date.past().getTime()
  }      
}


app.get('/messages/unread', (req, res) => {

  try{

    let message = [];

    const maxCalls = 3;

    for (let i = 0; i < Math.floor(Math.random() * (maxCalls + 1)); i++) {
       let newMassage = createRandomUser();
       message.push(newMassage)       
    }    
    
    const result = {
      "status": "ok",
      "timestamp": faker.date.past().getTime(),
      "messages": message
    }
    

    return res.status(200).json(result);

  }catch(error){

     const result = {
      status: "error",
      message: "Name is required!", 
    };
    return res.status(409).json(result);
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Server is running on port ${port}`);  
  console.log(`📋 Test: http://localhost:${port}//messages/unread`);
})




