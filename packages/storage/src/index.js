export class StateStore {
  constructor(name="holocron-states"){this.name=name;}
  async open(){this.db=await new Promise((resolve,reject)=>{const r=indexedDB.open(this.name,1);r.onupgradeneeded=()=>r.result.createObjectStore("states",{keyPath:"id"});r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});return this;}
  async put(record){await new Promise((resolve,reject)=>{const tx=this.db.transaction("states","readwrite");tx.objectStore("states").put(record);tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);});}
  async get(id){return await new Promise((resolve,reject)=>{const r=this.db.transaction("states").objectStore("states").get(id);r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});}
}
