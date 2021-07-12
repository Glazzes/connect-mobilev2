import { NavigatorScreenParams } from "@react-navigation/native";
import { StackScreenParams } from "./StackScreenParams";

export type DrawerScreenParams = {
  Home: NavigatorScreenParams<StackScreenParams>;
};
