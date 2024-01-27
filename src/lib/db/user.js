// Generated with CLI
import { getXataClient } from "@/xata";
const xata = getXataClient();

// get user from clerk and init user table
export async function initUser(user) {
    if (!user.id) {
        console.log("\No logedin user found!\n");
    }
    const record = await xata.db.users.read(user.id);
    if (!record) {
    await xata.db.users.create({
        id: user.id,
        username: user.username,
        "user-mail": user.emailAddresses[0].emailAddress,
        subscription: "rec_cmqd0gf41d3d009dh3cg",
    });
    }
}

// Get userid from xata database using email
export async function getUserId(email) {
    console.log(email);
    const user = await xata.db.users.filter({ 'user-mail': email }).getFirst();
    if(!user) {
        console.log("\nNo user found!\n");
        return -1;
    }
    console.log(user);
    return user.id;
}
