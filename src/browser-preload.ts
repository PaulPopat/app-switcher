import { ipcRenderer } from "electron";

const InternalNotification = window.Notification;

window.Notification = class extends InternalNotification {
  constructor(title: string, options?: NotificationOptions | undefined) {
    super(title, options);
    ipcRenderer.invoke("register-notification");
  }
};
