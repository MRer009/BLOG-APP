import config from "../config/config.js"
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client;
    account;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrlID)
        .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }

    //account create need email,password and uniqe id and name
    async createAccount({email , password , name}){
        try{
            const userAccount = await this.account.create(ID.unique() , email, password , name )
            if(userAccount){
                return this.login({email , password})
            }else{
                return userAccount;
            }
        }
        catch (error){
            throw error
        }

    }

    // login account need email and password
    async login({email , password}){
        try {
            return await this.account.createEmailSession(email,password)
            
        } catch (error) {
            throw error
        }
    }

    async getCurruntUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.error("Appwrite service :: getCurruntUser :: error", error);
            throw error;
        }
    }

    async logout({}){
        try {
            await this.account.deleteSessions();
            
        } catch (error) {
            console.log("Appwrite serive :: logout :: error" , error)
        }
    }

}

const authService = new AuthService();

export default authService
