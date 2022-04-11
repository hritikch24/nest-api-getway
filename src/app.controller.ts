import { Controller, Get, Query } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { MicroServiceInterface } from './microservice.interface';
import { config } from 'dotenv';

config({ path: join(__dirname, '../.env') });

@Controller()
export class AppController {
    @Client({
        transport: Transport.GRPC,
        options: {
            url: `${process.env.MICRO_SERVER_URL}:${process.env.MICRO_MSC_PORT}`,
            package: 'microservice',
            protoPath: join(__dirname, '_proto/microservice.proto')
        }
    })
    client: ClientGrpc;

    private microService: any;

    onModuleInit() {
        this.microService =
            this.client.getService<MicroServiceInterface>('MicroService');
    }

    @Get()
    async getHello(@Query('name') name) {
        const data = await this.microService.getHello({ name }).toPromise();
        return data.name;
    }
}
