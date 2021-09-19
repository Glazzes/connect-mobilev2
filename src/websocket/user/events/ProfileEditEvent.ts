import { ConnectionStatus } from "../../../shared/enums/ConnectionStatus";
import { EventType } from "../../shared/events/EventType";

type EventData = {
  nickname: string;
  profilePicture: string;
  lastLogin: any;
  connectionStatus: ConnectionStatus;
}

export interface ProfileEditEvent {
  type: EventType.PROFILE_EDIT;
  data: EventData;
}