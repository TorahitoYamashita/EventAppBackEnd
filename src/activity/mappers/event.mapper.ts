import { EventUiModel } from '../models/event.ui.model';
import { EventDbModel } from '../models/event.db.model';

export default class EventMapper {

  /* This mapper doesn't do much at this moment,
  however we have the flexibility to map our models as business requirements changes in the future */
  dbToUi(eventDbModel: EventDbModel): EventUiModel {
    return {
      id: eventDbModel.id,
      createdAt: eventDbModel.createdAt.toISOString(),
      email: eventDbModel.email,
      environment: eventDbModel.environment,
      component: eventDbModel.component,
      message: eventDbModel.message,
      data: eventDbModel.data,
    };
  }

}
