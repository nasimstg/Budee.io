import { buildClient } from "@xata.io/client";

const tables = [];


const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://Mohammed-Nasim-s-workspace-g7p9di.us-east-1.xata.sh/db/budee",
};

export class XataClient extends DatabaseClient {
  constructor(options) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance = undefined;

export const getXataClient = () => {
  if (instance) return instance;
  instance = new XataClient();
  return instance;
};
