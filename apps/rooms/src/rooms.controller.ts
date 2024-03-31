import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { request } from 'http';
import { BookRoomRequest, CreateRoomRequest, GetBookingsRequest } from './dto/create-room.request';
import { JwtAuthGuard } from '@app/common';
import { Types } from 'mongoose';

@Controller()
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getRooms() {
    return this.roomsService.getRooms();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrder(@Body() request: CreateRoomRequest, @Req() req: any) {
    return this.roomsService.createRoom(request);
  } 

  @Put(`/book`)
  @UseGuards(JwtAuthGuard)
  async bookRoom(@Body() request: BookRoomRequest){
    return this.roomsService.bookRoom(request);
  }

  @Get("/bookings/:id")
  @UseGuards(JwtAuthGuard)
  async getBookings(@Param('id') userId: string){
    return this.roomsService.getBookings({
      userId: userId
    })
  }

}
