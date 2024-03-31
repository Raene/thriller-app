import { Inject, Injectable } from '@nestjs/common';
import { RoomsRepository, RoomsUserRepository } from './rooms.repository';
import { BookRoomRequest, CreateRoomRequest, GetBookingsRequest } from './dto/create-room.request';
import { Condition, Types } from 'mongoose';
import { EMAIL_SERVICE } from './constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RoomsService {
  constructor(private readonly roomRepo: RoomsRepository, private readonly roomUserRepo: RoomsUserRepository, @Inject(EMAIL_SERVICE) private emailClient: ClientProxy){}
  getHello(): string {
    return 'Hello World!';
  }

  async createRoom(request: CreateRoomRequest){
    const session = await this.roomRepo.startTransaction();
    try {
      const room =  await this.roomRepo.create(request, {session});
      await lastValueFrom(
        this.emailClient.emit('room_created', {room})
      )
      await session.commitTransaction();
      return room;
    } catch (error) {
      await session.abortTransaction()
    }
  }

  async bookRoom(request: BookRoomRequest){
      const session = await this.roomRepo.startTransaction();
      try {
      const bookedRoom = await this.roomUserRepo.create(request, {session});
      await this.roomRepo.findOneAndUpdate({
        _id: request.roomId as Condition<Types.ObjectId>
      }, {
        available: false
      })
        await lastValueFrom(
          this.emailClient.emit('room_created', {bookedRoom})
        )
        await session.commitTransaction();
      } catch (error) {
        await session.abortTransaction()
      }
  }

  async getRooms(){
    return this.roomRepo.find({})
  }

  async getBookings(request: GetBookingsRequest){
    let roomUsers = await this.roomUserRepo.find(request);
    
    let roomIds = roomUsers.map((r)=> r.roomId);


    return await this.roomRepo.find({
      _id: {
        $in: roomIds as any
      }
    })
  }
}
