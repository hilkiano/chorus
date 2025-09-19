import { createAccessControl } from "better-auth/plugins/access";
import {
  defaultStatements,
  adminAc,
} from "better-auth/plugins/organization/access";

export const statement = {
  ...defaultStatements,
  chorus: ["view_homepage"],
} as const;

export const ac = createAccessControl(statement);

export const user = ac.newRole({
  chorus: ["view_homepage"],
});

export const admin = ac.newRole({
  chorus: ["view_homepage"],
});

export const superadmin = ac.newRole({
  chorus: [...statement.chorus],
  ...adminAc.statements,
});
