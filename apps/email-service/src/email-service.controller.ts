import { Controller, Get } from '@nestjs/common';
import { EmailServiceService } from './email-service.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from '@app/common';

@Controller()
export class EmailServiceController {
  constructor(private readonly emailServiceService: EmailServiceService, private readonly rmqService: RmqService) {}

  @Get()
  getHello(): string {
    return this.emailServiceService.getHello();
  }

  @EventPattern('room_created')
  async handleRoomCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    this.emailServiceService.notify(data, context.getPattern())
    this.rmqService.ack(context);
  }

  @EventPattern('room_booked')
  async handleRoomBooked(@Payload() data: any, @Ctx() context: RmqContext) {
    this.emailServiceService.notify(data, context.getPattern())
    this.rmqService.ack(context);
  }
}
