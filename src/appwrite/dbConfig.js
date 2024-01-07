import config from "../config/config.js"
import { Client, Databases, Storage , Query, ID } from "appwrite";


export class dbService{
    client = new Client;
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(config.appwriteUrlID)
        .setProject(config.appwriteProjectId)
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }


    // create post
    async createPost({title ,content, slug , featuredImage ,status , userId}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error" , error)
        }
    }

    //update post
    async updatePost (slug , {title , content , featuredImage , status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,{
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error" , error)
        }
    }

    // delete post
    async deletePost( slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error" , error)
            return false
        }
    }

    //get post (single post)
    async getPost (slug){
        try {
            return this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error" , error)
        }
    }

    //get all document
    async getPosts(queries = [Query.equal("status" , "active")]){
        try {
            return this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error" , error)
            return false
        }

    }

    // upload file
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
            
        } catch (error) {
            console.log("Appwrite service :: uploadfile :: error" , error)
            
        }
    }

    // delete file
    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error" , error)
            return false
        }
    }


    // get file preview
    getfilePreview(fileId){
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    }



}

const dbservice = new dbService();
export default dbservice