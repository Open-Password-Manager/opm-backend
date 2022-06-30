import {CONFIGURATION} from "./config";
import {ClientSession, connect, startSession} from "mongoose";
import {User} from "./Schemas/User";
import * as mongoose from "mongoose";
import {Category} from "./Schemas/Category";

async function run(){

    //TODO: Remove direct connection/establish a working replica set
    await connect(`mongodb://${CONFIGURATION.DATABASE.USERNAME}:${CONFIGURATION.DATABASE.PASSWORD}@${CONFIGURATION.DATABASE.HOST}:${CONFIGURATION.DATABASE.PORT}/${CONFIGURATION.DATABASE.DATA_DATABASE}?replicaSet=rs0&authMechanism=DEFAULT&authSource=${CONFIGURATION.DATABASE.AUTH_DATABASE}&directConnection=true`);

    const session = await startSession();
    //session.startTransaction();


    try{

        const user = await User.createIt(session, "Francois2", "mail2@francois-egner.de", "test123", "01785812107");

        console.time("New Category")
        for(let i = 1; i < 10; i++){
            await User.addNewCategory(session, user.id,`Cat${i}`)
            console.log(i + " finished!")
        }
        console.timeEnd("New Category")

        //await session.commitTransaction();

        console.time("userfetch")
        const user1 = await User.findOne({id: user.id}).populate("categories");
        console.timeEnd("userfetch")
        console.log(user1!.categories.length)

    }catch(err: unknown){
        console.log(err)
        await session.abortTransaction();

    }finally{
        await session.endSession();
    }

}

async function insert(count: number, session: ClientSession){

    console.time(`${count}`);
    let newUser = await User.create([{
        displayName: "Francois Egner",
        emailAddress: "mail@francois-egner.de",
        phoneNumber: "0178/5812107",
        password: "hashedPassword",
        categories: [new Category({name: `Category${count}`})]
    }], {session})




    console.timeEnd(`${count}`);

}

run()


