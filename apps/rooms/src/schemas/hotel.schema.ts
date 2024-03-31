import { AbstractDocument } from "@app/common";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { ObjectId } from "mongoose";


@Schema({versionKey: false})
export class Room extends AbstractDocument {
    @Prop()
    name: string;
    
    @Prop()
    price: number;
    
    @Prop()
    available: boolean
}


@Schema({versionKey: false})
export class Room_User extends AbstractDocument {
    @Prop()
    userId: ObjectId
    @Prop()
    roomId: ObjectId
}

export const RoomSchema = SchemaFactory.createForClass(Room);
export const Room_UserSchema = SchemaFactory.createForClass(Room_User);