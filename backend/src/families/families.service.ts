import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FamiliesService {
  constructor(private prisma: PrismaService) {}

  // Placeholder for future implementation
  async findAll() {
    return this.prisma.family.findMany();
  }
}

