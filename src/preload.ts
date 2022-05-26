import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("Api", {
  LoadApps: () => ipcRenderer.invoke("load-apps"),
  OpenApp: (name: string) => ipcRenderer.invoke("open-app", name),
  CloseApp: () => ipcRenderer.invoke("close-app"),
  HandleNavStart: (callback: (url: string) => void) =>
    ipcRenderer.on("nav-start", (e, v) => callback(v)),
  HandleNav: (callback: (url: string) => void) =>
    ipcRenderer.on("nav", (e, v) => callback(v)),
  Back: () => ipcRenderer.invoke("navigate-back"),
  Refresh: () => ipcRenderer.invoke("refresh"),
  AddApp: (name: string, url: string, icon_url: string) =>
    ipcRenderer.invoke("add-app", name, url, icon_url),
  DeleteApp: (id: string) => ipcRenderer.invoke("delete-app", id),
});
