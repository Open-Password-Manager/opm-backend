//INFO: Credentials for database and api connection will be set by the official installer (not yet implemented)
export const CONFIGURATION: Configuration = {
    //MongoDB
    DATABASE:{
        HOST: "localhost",
        PORT: 27017,
        USERNAME: "admin",
        PASSWORD: "6krbJJ4VRQJe7iKan",
        AUTH_DATABASE: "admin",
        DATA_DATABASE: "opassman",
        REPLICA_SET: "rs0"
    },
    API:{
        LISTEN_ADDRESS: "0.0.0.0",
        PORT: 4000,
    },
    USER:{
        PASSWORD_MIN_LENGTH: 12
    },
    SECURITY:{
        SALT_ROUNDS: 12
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
        PASSWORD: string,
        /** Database the authentication will be performed against */
        AUTH_DATABASE: string,
        /** Database for opassman data */
        DATA_DATABASE: string,
        /** Name of replica set to use (mandatory for transaction) */
        REPLICA_SET: string
    },
    /** API configuration */
    API:{
        /** Interface/IP on which the API will listen for requests */
        LISTEN_ADDRESS: string,
        /** Port on which the API will listen for requests */
        PORT: number
    },
    /** User related configuration */
    USER:{
        /** Minimal length of user password */
        PASSWORD_MIN_LENGTH: number
    },
    SECURITY:{
        /** Number of salt generation rounds */
        SALT_ROUNDS: number
    }
}