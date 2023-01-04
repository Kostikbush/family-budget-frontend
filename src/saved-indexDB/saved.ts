import { IDataUser } from "../models/IDataUser";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let idbSupported = false;
let db;

export const savedIndexDB = (aftorasationData: IDataUser) => {
  const aftorasationSaved = "aftorasationSaved";

  function indexedDBOk() {
    idbSupported = true;
    return "indexedDB" in window;
  }
  if (!indexedDBOk) return;
  let openRequest = indexedDB.open(aftorasationSaved, 1);

  openRequest.onupgradeneeded = function (e: any) {
    let thisDB = e.target.result;
    if (!thisDB.objectStoreNames.contains(aftorasationSaved)) {
      thisDB.createObjectStore(aftorasationSaved);
    }
  };

  openRequest.onsuccess = function (e: any) {
    db = e.target.result;
    let transaction = db.transaction("aftorasationSaved", "readwrite");
    let aftorasationSaved = transaction.objectStore("aftorasationSaved");
    let request = aftorasationSaved.put(aftorasationData, 0);

    request.onerror = function (e: any) {
      console.log("Error", e.target.error);
    };
    //request.onsuccess = function (e: any) {};
  };

  openRequest.onerror = function (e: any) {
    console.log("error");
  };
};

export const getDataFromIndexDB = () => {
  let data = {
    name: null,
    email: null,
    password: null,
  };
  function indexedDBOk() {
    idbSupported = true;
    return "indexedDB" in window;
  }
  if (!indexedDBOk) return;
  let openRequest = indexedDB.open("aftorasationSaved", 1);

  openRequest.onupgradeneeded = function (e: any) {
    let thisDB = e.target.result;
    if (!thisDB.objectStoreNames.contains("aftorasationSaved")) {
      thisDB.createObjectStore("aftorasationSaved");
    }
  };

  openRequest.onsuccess = function (e: any) {
    db = e.target.result;
    let transaction = db.transaction("aftorasationSaved", "readonly");
    let aftorasationSaved = transaction.objectStore("aftorasationSaved");
    let request = aftorasationSaved.openCursor();

    request.onerror = function (e: any) {
      if (e.target.error) {
        console.log("Error", e.target.error);
      }
    };
    request.onsuccess = function () {
      let cursor = request.result;
      if (cursor) {
        let value = cursor.value;
        data = value;
      }
    };
    openRequest.onerror = function () {
      console.log("error");
    };
  };
  return data;
};
