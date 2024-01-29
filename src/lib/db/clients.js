// Generated with CLI
import { getXataClient } from "@/xata";
const xata = getXataClient();
import { getUserId } from "./user";
import { v5 } from "uuid";

export async function addClient(email, data ) {
    const userId = await getUserId(email).then((id) => id);
    if(!data) {
        console.log("\nNo data found!\n");
        return -1;
    }

    data.id = v5(data.email, v5.DNS);
    const userClients = await xata.db.users.read(userId).then((user) => user.client);
    let newClients = [...userClients, data];

    const record = await xata.db.users.update( userId, {clients: newClients});
    console.log(record);
    return 0;
}


export const getClients = async (email) => {
    const userId = await getUserId(email).then((id) => id);
    const clients = await xata.db.users.read(userId).then((user) => user.clients);
    return clients;
}

export const getAccount = async (email, id) => {
    const userId = await getUserId(email).then((id) => id);
    const clients = await xata.db.users.read(userId).then((user) => user.clients);
    const account = clients.filter((account) => account.id === id);
    return account;
}

// Updata a contact with an existing contact id 
export const updateAccount = async (email, data, clientID) => {
    const userId = await getUserId(email).then((id) => id);
    if(!data) {
        console.log("\nNo data found!\n");
        return -1;
    }

    if(!data.name || !data.email) {
        console.log("\nNo data found!\n");
        return -1;
    }
    //Add an it to data object
    data.id = clientID;
    // Get user contacts array
    const userClients = await xata.db.users.read(userId).then((user) => user.clients);
    // Construct new contacts array
    let newClients = userClients.map((client) => {
        if(client.id === clientID) {
            return data;
        }
        return client;
    });


    const record = await xata.db.users.update( userId, {clients: newClients});
    return 0;
}

