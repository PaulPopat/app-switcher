import { IsString, Assert } from "@paulpopat/safe-type";
import { LoadApps } from "../repositories/apps";
import { Focus } from "../repositories/browsers";
import { ClearNotifications } from "../repositories/notification";
import { GetMainWindow } from "../window";

const IsOpenCommand = IsString;

export default async (id: unknown) => {
  Assert(IsOpenCommand, id);
  const apps = await LoadApps();
  const app = apps.find((a) => a.id === id);
  if (!app) return "failed";

  Focus(id);
  await ClearNotifications(id);
  GetMainWindow().webContents.send("new-notifications");

  return "success";
};
