//INFO: Credentials for database and api connection will be set by the official installer (not yet implemented)
export const CONFIGURATION: Configuration = {
    //MongoDB
    DATABASE:{
        HOST: "127.0.0.1",
        PORT: 27015,
        USERNAME: "opassman",
        PASSWORD: "CHANGEME"
    },
    API:{
        LISTEN_ADDRESS: "0.0.0.0",
        PORT: 4000
    }
}



export interface Configuration{
    /** MongoDB configuration */
    DATABASE:{
        /** Hostname/IP of MongoDB instance */
        HOST: string,
        /** Port of MongoDB instance */
        PORT: number,
        /** Username for MongoDB connection */
        USERNAME: string,
        /** Password for MongoDB connection */
        PASSWORD: string
    },
    /** API configuration */
    API:{
        /** Interface/IP on which the API will listen for requests */
        LISTEN_ADDRESS: string,
        /** Port on which the API will listen for requests */
        PORT: number
    }
}