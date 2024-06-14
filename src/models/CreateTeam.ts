import * as mongoose from "mongoose";
import { Schema,Document} from "mongoose";

export interface team extends Document{
    name:string,
    createdby:string,
    link:string,
    memberRequired:Number,
    isTeamfull:false,
    expiry:Date,
    participatedmember?:[],
    createdteam?:[],
    applyingteam?:[]
 }
 const teamdetail:Schema<team>=  new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    createdby:{
        type:String,
        require:true
    },
    link:{
        type:String,
        require:true
    },
    isTeamfull:{
        type:Boolean,
        default:false
    },
    memberRequired:Number,
    expiry:Date,
    participatedmember:[],
    createdteam:[],
    applyingteam:[],
    
    },{
        timestamps:true
    });
    export const teammodle = (mongoose.models.teamdetail || mongoose.model("teammodle",teamdetail));
    
