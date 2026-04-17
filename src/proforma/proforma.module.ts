import { Module } from '@nestjs/common';
import { ProformaService } from './proforma.service';
import { ProformaController } from './proforma.controller';

@Module({
  controllers: [ProformaController],
  providers: [ProformaService],
})
export class ProformaModule {}
