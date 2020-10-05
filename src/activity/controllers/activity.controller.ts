import { Body, Controller, Post } from '@nestjs/common';
import { ActivityService } from '../services/activity.service';
import { CreateEventModel } from '../models/create.event.model';
import { SearchEventModel } from '../models/search.event.model';
import { EventUiModel } from '../models/event.ui.model';

@Controller('api/activity')
export class ActivityController {

  constructor(private activityService: ActivityService) {
  }

  @Post('/event')
  createEvent(@Body() createEventModel: CreateEventModel): Promise<EventUiModel> {
    return this.activityService.createEvent(createEventModel);
  }

  @Post('/search')
  searchEvent(@Body() searchEventModel: SearchEventModel): Promise<EventUiModel[]> {
    return this.activityService.searchEvent(searchEventModel);
  }
}
