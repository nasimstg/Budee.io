// Generated with CLI
import { getXataClient } from "@/xata";
const xata = getXataClient();
import { getUserId } from "./user";

export async function addContact(email, data) {
    const userId = await getUserId(email).then((id) => id);
    if(!data) {
        console.log("\nNo data found!\n");
        return -1;
    }

    if(!data.name || !data.email) {
        console.log("\nNo data found!\n");
        return -1;
    }
    // Get user contacts array
    const userContacts = await xata.db.users.read(userId).then((user) => user.contacts);
    // Construct new contacts array
    let newContacts = [...userContacts, data];

    const record = await xata.db.users.update( userId, {contacts: newContacts});
    return 0;
}


export const getContacts = async (email) => {
    const userId = await getUserId(email).then((id) => id);
    const contacts = await xata.db.users.read(userId).then((user) => user.contacts);
    return contacts;
}