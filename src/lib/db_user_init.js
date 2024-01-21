// Generated with CLI
import { getXataClient } from "../xata.js";
const xata = getXataClient();

export function initUser() {
    /*
  return xata.db.users.createTable({
    "username": "string",
  "google-ads-api-token": "string",
  "meta-ads-api-token": "string",
  "user-mail": "string",
  "tiktok-ads-api-token": "string",
  "bing-ads-api-token": "string",
  "linkedin-ads-api-token": "string",
  });*/
}   

const record = await xata.db.users.read("");
console.log(record);