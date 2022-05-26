import {
  IsArray,
  IsObject,
  IsString,
  Assert,
  IsType,
} from "@paulpopat/safe-type";
import { app } from "electron";
import Fs from "fs-extra";
import Path from "path";
import { v4 as Guid } from "uuid";
import { GetAppIcon } from "../services/icon";

const Location = Path.join(
  app.getPath("userData"),
  "app-switcher",
  "apps.json"
);

const IsApp = IsObject({
  id: IsString,
  name: IsString,
  url: IsString,
  icon: IsString,
});

const IsApps = IsArray(IsApp);

export type App = IsType<typeof IsApp>;

export async function LoadApps() {
  if (!(await Fs.pathExists(Location))) await Fs.outputJson(Location, []);

  const apps = await Fs.readJson(Location);
  Assert(IsApps, apps);

  return apps;
}

export async function GetApp(id: string) {
  const apps = await LoadApps();
  return apps.find((app) => app.id === id);
}

export async function AddApp(
  name: string,
  url: string,
  icon_url?: string | null
) {
  const id = Guid();
  const icon = await GetAppIcon(icon_url || url);
  const existing = await LoadApps();
  const input = {
    id,
    name,
    url,
    icon,
  };
  await Fs.outputJson(Location, [...existing, input]);
  return input;
}

export async function DeleteApp(id: string) {
  const existing = await LoadApps();
  await Fs.outputJson(
    Location,
    existing.filter((e) => e.id !== id)
  );
}
