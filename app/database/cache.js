class Cache {
  constructor() {
    if (!Cache.instance) {
      this.data = {};
      Cache.instance = this;
    }
  }

  setValue(key, value) {
    this.data[key] = value;
  }

  getValue(key) {
    return this.data[key];
  }
}

const instance = new Cache();
export default instance;
