import field from "@nozbe/watermelondb/decorators/field";
import Model from "@nozbe/watermelondb/Model";

export default class ChatRoom extends Model {
  static table = 'chatrooms';
  
  // @ts-ignore
  @field('has_messages') hasMessages;

  // @ts-ignore
  @field('has_been_cleaned') hasBeenCleaned;
}