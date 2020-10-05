import { Test, TestingModule } from '@nestjs/testing';
import { ActivityService } from './activity.service';
import * as mongoose from 'mongoose';
import { EventSchema } from '../schemas/event.schema';
import { getModelToken } from '@nestjs/mongoose';
import mockingoose from 'mockingoose';
import { factory as eventDbDataFactory } from '../mocks/event.db.data';
import { factory as eventUpstreamDataFactory } from '../mocks/event.upstream.data';

describe('ActivityService', () => {
  let service: ActivityService;
  const event = mongoose.model('Event', EventSchema);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivityService,
        {
          provide: getModelToken('Event'),
          useValue: event,
        },
      ],
    }).compile();

    service = module.get<ActivityService>(ActivityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createEvent', () => {

    it('should return EventUiModel object', async (done) => {
      const creatEventPayload = {
        email: 'torahito@chefhero.com',
        environment: 'production',
        component: 'orders',
        message: 'placed an order successfully',
        data: {},
      };
      mockingoose(event).toReturn(eventDbDataFactory.data(), 'save');

      service.createEvent(creatEventPayload).then((result) => {
        expect(result).toEqual(eventUpstreamDataFactory.data());
        done();
      });
    });

  });

  describe('searchEvent', () => {

    it('should return a list of EventUiModel objects', async (done) => {
      const searchEventPayload = {
        email: 'torahito@chefhero.com',
        environment: 'production',
        component: 'orders',
        message: 'placed an order successfully',
        createdAt: '2020-10-3',
      };
      mockingoose(event).toReturn([eventDbDataFactory.data()], 'find');

      service.searchEvent(searchEventPayload).then((result) => {
        expect(result).toEqual([eventUpstreamDataFactory.data()]);
        done();
      });
    });

  });

});
