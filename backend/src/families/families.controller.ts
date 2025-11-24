import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FamiliesService } from './families.service';

@ApiTags('families')
@Controller('families')
export class FamiliesController {
  constructor(private readonly familiesService: FamiliesService) {}

  @Get()
  findAll() {
    return this.familiesService.findAll();
  }
}

