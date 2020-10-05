import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActivityModule } from './activity/activity.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI, JSON.parse(process.env.MONGODB_PARAMS)),
    ActivityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
