/* eslint-disable @typescript-eslint/no-unused-vars */
import { IUser } from "../models/IUser";

let idbSupported = false;
let db: IDBDatabase;

export const savedIndexDB = (aftorasationData: IUser) => {
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
  };

  openRequest.onerror = function (e: any) {
    console.log("error");
  };
};
//////////////////////////////////
export const getDataFromIndexDB = (func: Function, fun: Function) => {
  let name: string = "";
  let email: string = "";
  let password: string = "";
  let alert: Array<{}> = [];
  let avatar: string = "";
  let isSetComment: boolean = false;
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
        alert = value.alert || [];
        avatar = value.avatar || "";
        isSetComment = value.isSetComment || false;
        func(fun({ name, email, password, alert, avatar, isSetComment }));
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

export const deleteDataBaseIndexDb = () => {
  const request = indexedDB.open("aftorasationSaved");
  request.onsuccess = function (event: any) {
    const db = event.target.result;

    const transaction = db.transaction(["aftorasationSaved"], "readwrite");
    const objectStore = transaction.objectStore("aftorasationSaved");
    objectStore.clear();
  };
};
