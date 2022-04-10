import { Controller, Get, Param, Query } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { MicroServiceInterface } from './microservice.interface';

@Controller()
export class AppController {
    @Client({
        transport: Transport.GRPC,
        options: {
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
