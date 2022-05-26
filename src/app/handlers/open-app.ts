import { IsString, Assert } from "@paulpopat/safe-type";
import { LoadApps } from "../repositories/apps";
import { Focus } from "../repositories/browsers";

const IsOpenCommand = IsString;

export default async (id: unknown) => {
  Assert(IsOpenCommand, id);
  const apps = await LoadApps();
  const app = apps.find((a) => a.id === id);
  if (!app) return "failed";

  Focus(id);
  return "success";
};
