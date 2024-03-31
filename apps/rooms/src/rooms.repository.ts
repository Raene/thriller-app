import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { Room, Room_User } from "./schemas/hotel.schema";
import { InjectConnection, InjectModel } from "@nestjs/mongoose";
import { Connection, Model } from "mongoose";


@Injectable()
export class RoomsRepository extends AbstractRepository<Room>{
    protected readonly logger = new Logger(RoomsRepository.name)

    constructor(
        @InjectModel(Room.name) roomModel: Model<Room>,
        @InjectConnection() connection: Connection,
    ){
        super(roomModel, connection);
    }
}

@Injectable()
export class RoomsUserRepository extends AbstractRepository<Room_User>{
    protected readonly logger = new Logger(RoomsUserRepository.name)

    constructor(
        @InjectModel(Room_User.name) roomUserModel: Model<Room_User>,
        @InjectConnection() connection: Connection,
    ){
        super(roomUserModel, connection);
    }
}