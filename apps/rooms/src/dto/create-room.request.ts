import { IsBoolean, IsMongoId, IsNotEmpty, IsPositive, IsString, IsUUID } from "class-validator";
import { ObjectId, Types } from "mongoose";

export class CreateRoomRequest {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsPositive()
    @IsNotEmpty()
    price: number;

    @IsBoolean()
    @IsNotEmpty()
    available: boolean
}

export class BookRoomRequest {
    @IsNotEmpty()
    @IsMongoId()
    userId: ObjectId;
    @IsNotEmpty()
    @IsMongoId()
    roomId: ObjectId;
}

export class GetBookingsRequest {
    @IsMongoId()
    @IsNotEmpty()
    userId: string;
}