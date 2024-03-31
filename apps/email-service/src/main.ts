import { NestFactory } from '@nestjs/core';
import { EmailServiceModule } from './email-service.module';
import { RmqService } from '@app/common';
import { delay } from 'rxjs';

async function bootstrap() {
  const app = await NestFactory.create(EmailServiceModule);
  const rmqService = app.get<RmqService>(RmqService);
  //delay for 3 seconds before connecting, since rabbit mq takes time to start on docker

  app.connectMicroservice(rmqService.getOptions('EMAIL'))
  await app.startAllMicroservices();
}
bootstrap();
