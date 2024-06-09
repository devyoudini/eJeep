import HomeSheet from "@/app/(home)/homeSheet";
import SignOutSheet from "@/app/(home)/signoutSheet";
import { SheetDefinition, registerSheet } from "react-native-actions-sheet";
import RoleSelectSheet from "../(auth)/actionSheet";

registerSheet("roleSelectSheet", RoleSelectSheet);
registerSheet("signoutSheet", SignOutSheet);
registerSheet("homeSheet", HomeSheet);

declare module "react-native-actions-sheet" {
  interface Sheets {
    roleSelectSheet: SheetDefinition;
    signoutSheet: SheetDefinition;
    homeSheet: SheetDefinition;
  }
}

export { };
