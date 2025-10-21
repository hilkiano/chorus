export const pageKeys = [
  "VIEW_HOMEPAGE",
  "VIEW_USERS",
  "VIEW_PERSONALIZATION",
  "VIEW_MAP_EDITOR",
] as const;
export type PageKey = (typeof pageKeys)[number];

export const actionsUsersKeys = [
  "USERS_INVITE",
  "USERS_DEACTIVATE",
  "USERS_ACTIVATE",
  "USERS_CHANGE_ROLE",
] as const;
export type ActionUsersKey = (typeof actionsUsersKeys)[number];
