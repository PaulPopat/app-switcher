import { IpcMainInvokeEvent } from "electron";
import { GetAppFromWebId } from "../repositories/browsers";
import { AddNotification } from "../repositories/notification";
import { GetMainWindow } from "../window";

export default async function (this: IpcMainInvokeEvent) {
  const app_id = GetAppFromWebId(this.sender.id);
  console.log(`Notification for ${app_id}`);
  await AddNotification(app_id);
  GetMainWindow().webContents.send("new-notifications");
}
