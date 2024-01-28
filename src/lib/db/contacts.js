// Generated with CLI
import { getXataClient } from "@/xata";
const xata = getXataClient();
import { getUserId } from "./user";
import { v5 } from "uuid";

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
    //Add an it to data object
    data.id = v5(data.email, v5.DNS);
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
    console.log(contacts);
    return contacts;
}

export const getContact = async (email, id) => {
    console.log(id);
    const userId = await getUserId(email).then((id) => id);
    const contacts = await xata.db.users.read(userId).then((user) => user.contacts);
    const contact = contacts.filter((contact) => contact.id === id);
    console.log(contact);
    return contact;
}

// Updata a contact with an existing contact id 
export const updateContact = async (email, data, contactId) => {
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
    data.id = contactId;
    // Get user contacts array
    const userContacts = await xata.db.users.read(userId).then((user) => user.contacts);
    // Construct new contacts array
    let newContacts = userContacts.map((contact) => {
        if(contact.id === contactId) {
            return data;
        }
        return contact;
    });


    const record = await xata.db.users.update( userId, {contacts: newContacts});
    return 0;
}

