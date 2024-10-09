import { IMentorProps } from "./mentor.interface";
import { IUserProps } from "./user.interface";

export interface IChatProps {
  users: {
    user: IUserProps;
    mentor: IMentorProps;
  };
  sessionDetails: {
    roomId: string;
    roomCode: {
      host: string;
      mentor: string;
    };
    roomName: string;
    description: string;
    callType: callType;
    duration: string;
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
  status?: callStatus;
  createdAt?: string;
  updatedAt?: string;
  _id?: string;
}
export type callStatus =
  | "REJECTED"
  | "ONGOING"
  | "COMPLETED"
  | "PENDING"
  | "ACCEPTED";
export type callType = "video" | "audio" | "chat" | "all";
