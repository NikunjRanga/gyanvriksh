import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService) {}

  // Placeholder for future implementation (Phase 6)
  async findAll() {
    return this.prisma.lesson.findMany();
  }
}

