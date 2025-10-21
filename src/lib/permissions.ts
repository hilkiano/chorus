import { createAccessControl } from "better-auth/plugins/access";
import {
  defaultStatements,
  adminAc,
} from "better-auth/plugins/organization/access";
import { actionsUsersKeys, PageKey, pageKeys } from "./permission-keys";

export const statement = {
  ...defaultStatements,
  page: pageKeys,
  users: actionsUsersKeys,
} as const;

export const ac = createAccessControl(statement);

export const user = ac.newRole({
  page: ["VIEW_HOMEPAGE", "VIEW_PERSONALIZATION"] satisfies PageKey[],
});

export const admin = ac.newRole({
  page: [
    "VIEW_HOMEPAGE",
    "VIEW_PERSONALIZATION",
    "VIEW_USERS",
  ] satisfies PageKey[],
});

export const owner = ac.newRole({
  page: [
    "VIEW_HOMEPAGE",
    "VIEW_PERSONALIZATION",
    "VIEW_USERS",
    "VIEW_MAP_EDITOR",
  ] satisfies PageKey[],
});

export const superadmin = ac.newRole({
  page: [...statement.page],
  users: [...statement.users],
  ...adminAc.statements,
});

export const rolesByName = {
  user,
  admin,
  owner,
  superadmin,
} as const;
