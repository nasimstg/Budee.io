// Generated with CLI
import { getXataClient } from "@/xata";
const xata = getXataClient();
import { getUserId } from "./user";
import { v5 } from "uuid";

export async function addDataSource(email, data ) {
    const userId = await getUserId(email).then((id) => id);
    if(!data) {
        console.log("\nNo data found!\n");
        return -1;
    }

    data.id = v5(data.email, v5.DNS);
    const userAccounts = await xata.db.users.read(userId).then((user) => user.accounts);
    let newAccounts = [...userAccounts, data];

    const record = await xata.db.users.update( userId, {accounts: newAccounts});
    console.log(record);
    return 0;
}


export const getAccounts = async (email) => {
    const userId = await getUserId(email).then((id) => id);
    const accounts = await xata.db.users.read(userId).then((user) => user.accounts);
    return accounts;
}

export const getAccount = async (email, id) => {
    const userId = await getUserId(email).then((id) => id);
    const accounts = await xata.db.users.read(userId).then((user) => user.accounts);
    const account = accounts.filter((account) => account.id === id);
    return account;
}

// Updata a contact with an existing contact id 
export const updateAccount = async (email, data, accountID) => {
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
    data.id = accountID;
    // Get user contacts array
    const userAccounts = await xata.db.users.read(userId).then((user) => user.accounts);
    // Construct new contacts array
    let newAccounts = userAccounts.map((account) => {
        if(account.id === accountID) {
            return data;
        }
        return account;
    });


    const record = await xata.db.users.update( userId, {accounts: newAccounts});
    return 0;
}

