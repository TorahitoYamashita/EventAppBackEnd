import {Test, TestingModule} from '@nestjs/testing';
import * as request from 'supertest';
import {ActivityModule} from './activity.module';
import {MongooseModule} from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

describe('Activity (e2e)', () => {
    let app;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                ActivityModule,
                MongooseModule.forRoot(process.env.MONGODB_URI, JSON.parse(process.env.MONGODB_PARAMS)),
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    describe('[POST] createEvent', () => {
        const creatEventPayload = {
            email: 'torahito@chefhero.com',
            environment: 'production',
            component: 'orders',
            message: 'placed an order successfully',
            data: {},
        };

        const anotherCreatEventPayload = {
            email: 'tim@chefhero.com',
            environment: 'production',
            component: 'orders',
            message: 'placed another order successfully',
            data: {},
        };

        const searchEventPayload = {
            email: 'torahito@chefhero.com',
        };

        it('createEvent', async () => {
            const response = await request(app.getHttpServer())
                .post('/api/activity/event')
                .send(creatEventPayload)
                .expect(201);
            expect(response.body.toString()).toContain(creatEventPayload);
        });

        it('createEvent - another one', async () => {
            const response = await request(app.getHttpServer())
                .post('/api/activity/event')
                .send(anotherCreatEventPayload)
                .expect(201);
            expect(response.body.toString()).toContain(anotherCreatEventPayload);
        });

        it('searchEvent', async () => {
            const response = await request(app.getHttpServer())
                .post('/api/activity/search')
                .send(searchEventPayload)
                .expect(201);
            expect(response.body.toString()).toContain(creatEventPayload);
        });

        // We could add more and more conditional search event tests below as needed

    });

});
