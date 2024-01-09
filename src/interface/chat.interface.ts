import { IMentorProps } from "./mentor.interface";
import { IUserProps } from "./user.interface";

export interface IChatProps {
     users: {
          user: IUserProps;
          mentor: IMentorProps;
     };
     sessionDetails: {
          roomId: string;
          roomToken: string;
     };
     message: [
          {
               messageId: string;
               message: string;
               senderId: string;
               senderName: string;
               timestamp: string;
               topic: string;
          }
     ];
     status?: callType;
     createdAt?: string;
     updatedAt?: string;
}
export type callType = "REJECTED" | "ONGOING" | "COMPLETED" | "PENDING" | "ACCEPTED";
