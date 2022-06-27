import {CONFIGURATION} from "./config";
import {ClientSession, connect, startSession} from "mongoose";
import {User} from "./Schemas/User";
import * as mongoose from "mongoose";
import {Category} from "./Schemas/Category";

async function run(){

    //TODO: Remove direct connection/establish a working replica set
     await connect(`mongodb://${CONFIGURATION.DATABASE.USERNAME}:${CONFIGURATION.DATABASE.PASSWORD}@${CONFIGURATION.DATABASE.HOST}:${CONFIGURATION.DATABASE.PORT}/${CONFIGURATION.DATABASE.DATA_DATABASE}?replicaSet=rs0&authMechanism=DEFAULT&authSource=${CONFIGURATION.DATABASE.AUTH_DATABASE}&directConnection=true`);

}

run()


