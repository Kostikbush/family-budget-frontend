import { IUserDataAftorization } from "../models/IActionPaylod";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let idbSupported = false;
let db: IDBDatabase;

export const savedIndexDB = (aftorasationData: IUserDataAftorization) => {
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

export const getDataFromIndexDB = (func: Function, fun: Function) => {
  let name: string = "";
  let email: string = "";
  let password: string = "";
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
        name = value.name.slice(value.name.lenght);
        email = value.email.slice(value.email.lenght);
        password = value.password.slice(value.password.lenght);
        func(fun({ name, email, password }));
      }
    };
    openRequest.onerror = function () {
      console.log("error");
    };
  };
  const data = {
    email,
    name,
    password,
  };
  return data;
};
// return new Promise((resolve) => {
//   if (cursor !== null) {
//     resolve({ data: cursor.value });
//   }
// });
