import dotenv from 'dotenv'
dotenv.config();

import aws from 'was-sdk';
import fs from 'fs'

AWS.config.update({
    accessKeyId: "",
    accessSecretKey:"",
    region: "",
})

const aws = new AWS.S3();

const filePath = "path/your/file/img.jpg";
const fielContend = fs.readFileSync(filePath);

const params = {
    Bucket: "",
    key: "",
    body: "",
 }

 S3.upload(params, (data, err) => {
       if(err) {
        console.log("File not uploaded")
       }else{
        console.log("file upaloaded successfully", data)
       }
 })

 export default AWS;



