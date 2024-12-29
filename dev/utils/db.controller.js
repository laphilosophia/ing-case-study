import {openDB} from 'idb';
import {data} from '../utils/data';

export class Database {
  host;
  _dbName = 'ing-database';
  _version = 1;
  _storeName = 'keyval';

  constructor(host) {
    this.host = host;
    this.db = null;
    host.addController(this);

    this.init();

    if (this.db === null) {
      this.seed();
    }
  }

  async all() {
    return (await this.db)?.getAll(this._storeName);
  }

  async get(key) {
    return (await this.db)?.get(this._storeName, key);
  }

  async set(key, val) {
    return (await this.db)?.put(this._storeName, val, key);
  }

  async del(key) {
    return (await this.db)?.delete(this._storeName, key);
  }

  async clear() {
    return (await this.db)?.clear(this._storeName);
  }

  init() {
    const name = this._storeName;

    this.db = openDB(this._dbName, this._version, {
      upgrade(db) {
        db.createObjectStore(name);
      },
    });
  }

  seed() {
    data.forEach(async (item) => {
      await this.set(item.id, item);
    });
  }
}
