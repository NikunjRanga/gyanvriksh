import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { StoriesService } from './stories.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';

@ApiTags('stories')
@Controller('stories')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new story' })
  @ApiResponse({ status: 201, description: 'Story created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async create(@Body() createStoryDto: CreateStoryDto) {
    try {
      return await this.storiesService.create(createStoryDto);
    } catch (error) {
      console.error('Error creating story:', error);
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all stories' })
  @ApiResponse({ status: 200, description: 'List of stories' })
  findAll(
    @Query('userId') userId?: string,
    @Query('familyId') familyId?: string,
    @Query('tags') tags?: string,
  ) {
    return this.storiesService.findAll({ userId, familyId, tags });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a story by ID' })
  @ApiResponse({ status: 200, description: 'Story details' })
  @ApiResponse({ status: 404, description: 'Story not found' })
  findOne(@Param('id') id: string) {
    return this.storiesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a story' })
  @ApiResponse({ status: 200, description: 'Story updated successfully' })
  update(@Param('id') id: string, @Body() updateStoryDto: UpdateStoryDto) {
    return this.storiesService.update(id, updateStoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a story' })
  @ApiResponse({ status: 200, description: 'Story deleted successfully' })
  remove(@Param('id') id: string) {
    return this.storiesService.remove(id);
  }
}


