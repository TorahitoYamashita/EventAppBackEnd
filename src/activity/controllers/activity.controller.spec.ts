import { Test, TestingModule } from '@nestjs/testing';
import { ActivityController } from './activity.controller';
import { ActivityService } from '../services/activity.service';
import { getModelToken } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { EventSchema } from '../schemas/event.schema';
import { factory as eventUpstreamDataFactory } from '../mocks/event.upstream.data';
import { EventUiModel } from '../models/event.ui.model';

describe('ActivityController', () => {
  let controller: ActivityController;
  let service: ActivityService;
  const event = mongoose.model('Event', EventSchema);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityController],
      providers: [
        ActivityService,
        {
          provide: getModelToken('Event'),
          useValue: event,
        },
      ],
    }).compile();

    controller = module.get<ActivityController>(ActivityController);
    service = module.get<ActivityService>(ActivityService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createEvent', () => {

    it('should return EventModel object', async () => {
      const creatEventPayload = {
        email: 'torahito@chefhero.com',
        environment: 'production',
        component: 'orders',
        message: 'placed an order successfully',
        data: {},
      };

      jest.spyOn(service, 'createEvent').mockImplementation(() => Promise.resolve<EventUiModel>(eventUpstreamDataFactory.data()));
      expect(await controller.createEvent(creatEventPayload)).toEqual(eventUpstreamDataFactory.data());
    });

  });

  describe('searchEvent', () => {

    it('should return a list of EventModel objects', async () => {
      const searchEventPayload = {
        email: 'torahito@chefhero.com',
        environment: 'production',
        component: 'orders',
        message: 'placed an order successfully',
        createdAt: '2020-10-3',
      };

      jest.spyOn(service, 'searchEvent').mockImplementation(() => Promise.resolve<EventUiModel[]>([eventUpstreamDataFactory.data()]));
      expect(await controller.searchEvent(searchEventPayload)).toEqual([eventUpstreamDataFactory.data()]);
    });

  });

});
