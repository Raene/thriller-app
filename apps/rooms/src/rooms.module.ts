import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { ConfigModule } from '@nestjs/config';
import * as joi from "joi";
import { AuthModule, DatabaseModule, RmqModule } from '@app/common';
import { RoomsRepository, RoomsUserRepository } from './rooms.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, Room_User, Room_UserSchema, RoomSchema } from './schemas/hotel.schema';
import { EMAIL_SERVICE } from './constants/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema:joi.object({
        MONGODB_URI: joi.string().required(),
        PORT: joi.number().required(),
      }),
      envFilePath: `./apps/hotels/.env`,
    }),
    DatabaseModule,
    MongooseModule.forFeature([{name: Room.name, schema: RoomSchema}, {name: Room_User.name, schema: Room_UserSchema}]),
    RmqModule.register({
      name: EMAIL_SERVICE
    }),
    AuthModule
  ],
  controllers: [RoomsController],
  providers: [RoomsService, RoomsRepository, RoomsUserRepository],
})
export class RoomsModule {}
