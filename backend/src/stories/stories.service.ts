import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';

@Injectable()
export class StoriesService {
  constructor(private prisma: PrismaService) {}

  async create(createStoryDto: CreateStoryDto) {
    // For now, we'll use a default user
    // In Phase 2, this will come from authenticated user
    const defaultUserEmail = 'default@gyanvriksh.com';
    
    // Find or create default user
    let user = await this.prisma.user.findUnique({
      where: { email: defaultUserEmail },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: defaultUserEmail,
          name: 'Default User',
        },
      });
    }

    const userId = user.id;

    const story = await this.prisma.story.create({
      data: {
        title: createStoryDto.title,
        elderName: createStoryDto.elderName,
        mediaType: createStoryDto.mediaType,
        mediaUrl: createStoryDto.mediaUrl,
        mediaSize: createStoryDto.mediaSize,
        description: createStoryDto.description,
        prompt: createStoryDto.prompt,
        date: createStoryDto.date ? new Date(createStoryDto.date) : new Date(),
        tags: createStoryDto.tags || [],
        familyId: createStoryDto.familyId || null,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        family: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return story;
  }

  async findAll(filters?: { userId?: string; familyId?: string; tags?: string }) {
    const where: any = {};

    if (filters?.userId) {
      where.userId = filters.userId;
    }

    if (filters?.familyId) {
      where.familyId = filters.familyId;
    }

    if (filters?.tags) {
      const tagArray = filters.tags.split(',');
      where.tags = {
        hasSome: tagArray,
      };
    }

    const stories = await this.prisma.story.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        family: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return stories;
  }

  async findOne(id: string) {
    const story = await this.prisma.story.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        family: {
          select: {
            id: true,
            name: true,
          },
        },
        lessons: true,
      },
    });

    if (!story) {
      throw new NotFoundException(`Story with ID ${id} not found`);
    }

    return story;
  }

  async update(id: string, updateStoryDto: UpdateStoryDto) {
    const existingStory = await this.findOne(id);

    const updatedStory = await this.prisma.story.update({
      where: { id },
      data: {
        ...updateStoryDto,
        date: updateStoryDto.date ? new Date(updateStoryDto.date) : undefined,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        family: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return updatedStory;
  }

  async remove(id: string) {
    const story = await this.findOne(id);

    await this.prisma.story.delete({
      where: { id },
    });

    return { message: 'Story deleted successfully', id: story.id };
  }
}


