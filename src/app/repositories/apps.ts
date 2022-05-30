import { IsObject, IsString, IsType } from "@paulpopat/safe-type";
import { GetAppIcon } from "../services/icon";
import { GenerateStore } from "../utils/json-store";
import { GetNotifications } from "./notification";

const IsApp = IsObject({
  name: IsString,
  url: IsString,
  icon: IsString,
});

const Store = GenerateStore(IsApp, "apps");

export type App = IsType<typeof Store.Schema>;

export async function LoadApps() {
  const apps = await Store.GetAll();
  return await Promise.all(
    apps.map(async (a) => ({
      ...a,
      notifications: await GetNotifications(a.id),
    }))
  );
}

export async function GetApp(id: string) {
  return await Store.Get(id);
}

export async function AddApp(
  name: string,
  url: string,
  icon_url?: string | null
) {
  const icon = await GetAppIcon(icon_url || url);
  const input = {
    name,
    url,
    icon,
  };
  const id = await Store.Add(input);
  return { ...input, id };
}

export async function DeleteApp(id: string) {
  await Store.Delete(id);
}
