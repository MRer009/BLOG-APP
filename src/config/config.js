const config ={
    appwriteUrlID : String(import.meta.env.VITE_APPWRITE_URL),
    appwriteDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKET),
    appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID)
}

export default config



