import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmailServiceService {
  private readonly logger = new Logger(EmailServiceService.name)
  getHello(): string {
    return 'Hello World!';
  }

  notify(data: any, eventName: string){
    this.logger.log(`Sending notification email to admin here that the room has been created ${eventName}`, JSON.stringify(data, null ,2))
  }
}
