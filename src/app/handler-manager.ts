import { ipcMain } from "electron";

let handlers: Record<string, (...args: any[]) => Promise<any>> = {};

/**
 * @param {string} handle
 * @param {(this: Electron.IpcMainInvokeEvent, ...args: any[]) => Promise<any>} handler
 */
export function Register(
  handle: string,
  handler: (this: Electron.IpcMainInvokeEvent, ...args: any[]) => Promise<any>
) {
  handlers[handle] = handler;
}

export function BuildHandlers() {
  for (const handle in handlers) {
    if (!Object.prototype.hasOwnProperty.call(handlers, handle)) continue;
    ipcMain.handle(handle, (event, ...args) =>
      handlers[handle].call(event, ...args)
    );
  }
}
