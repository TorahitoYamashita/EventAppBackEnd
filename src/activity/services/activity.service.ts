import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CreateEventModel} from '../models/create.event.model';
import * as uuid from 'uuid/v4';
import {SearchEventModel} from '../models/search.event.model';
import {EventDbModel} from '../models/event.db.model';
import {EventUiModel} from '../models/event.ui.model';
import EventMapper from '../mappers/event.mapper';

@Injectable()
export class ActivityService {

    constructor(@InjectModel('Event') private eventModel: Model<EventDbModel>) {
    }

    async createEvent(createEventModel: CreateEventModel): Promise<EventUiModel> {
        const currentTime = new Date().toISOString();
        const event = await new this.eventModel({
            ...createEventModel,
            id: `${currentTime} ${uuid()}`,
            createdAt: currentTime,
        }).save();

        return new EventMapper().dbToUi(event);
    }

    async searchEvent({message = '', ...searchEventModel}: SearchEventModel): Promise<EventUiModel[]> {
        for (const propName in searchEventModel) {
            if (!searchEventModel[propName] && propName !== 'message') {
                delete searchEventModel[propName];
            }
        }

        const events = searchEventModel.createdAt
            ? await this.eventModel.find({
                ...searchEventModel,
                message: {$regex: `${message}`, $options: 'i'},
                // @ts-ignore
                createdAt: {
                    $gte: new Date(searchEventModel.createdAt),
                    $lt: new Date(searchEventModel.createdAt).setDate(new Date(searchEventModel.createdAt).getDate() + 1),
                },
            })
            // @ts-ignore
            : await this.eventModel.find({
                ...searchEventModel,
                message: {$regex: `${message}`, $options: 'i'},
            });

        return events.map(event => new EventMapper().dbToUi(event));
    }
}
