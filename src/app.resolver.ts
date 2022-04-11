import { Resolver, Query, Args } from '@nestjs/graphql';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppType, requestDto } from './app.dto';
import { MicroServiceInterface } from './microservice.interface';

@Resolver((of) => AppType)
export class AppResolver {
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

    @Query((returns) => AppType)
    async getHello(@Args('input') requestDto: requestDto) {
        const data = await this.microService.getHello(requestDto).toPromise();
        return data;
    }
}
