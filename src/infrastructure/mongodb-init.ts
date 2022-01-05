import mongoose from "mongoose";

export default class MongoDb{
    static init(){
        mongoose.connect('mongodb://localhost:27017/fatura', err => {
             if(err){
                 throw new Error('[*] Database Error  while Connection ${err}');
             }
             console.log('[*] Database Connected sucessfuly')
        });
    }
}
