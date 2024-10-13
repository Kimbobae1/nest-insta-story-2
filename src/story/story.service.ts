import {BadRequestException, Injectable} from '@nestjs/common';
import { CreateStoryDto } from './dto/create-story.dto';
import {Story} from "./entities/story.entity";
import {MoreThan} from "typeorm";
import {PaginationDto} from "./dto/pagination.dto";

@Injectable()
export class StoryService {
  create(createStoryDto: CreateStoryDto) {
    const storyEntity = new Story();
    storyEntity.title = createStoryDto.title;
    storyEntity.author = createStoryDto.author;
    storyEntity.image = createStoryDto.image;
    storyEntity.hashtags = [...new Set(createStoryDto.hashtags)];
    storyEntity.validTime = createStoryDto.validTime;
    storyEntity.createdAt = new Date();
    return storyEntity.save();
  }

  async findAll(paginationDto : PaginationDto) {
    const page = parseInt(paginationDto.page) ?? 1;
    const limit = parseInt(paginationDto.limit);

    if (isNaN(page) || isNaN(limit)) {
      throw new BadRequestException('Page and limit must be valid integers.');
    }

    const baseDate = new Date();
    baseDate.setHours(baseDate.getHours() - 12);

    const total = await Story.count({
      where : {
        createdAt: MoreThan(baseDate)
      }
    });

    const stories = await Story.createQueryBuilder('story')
        .where('story.createdAt > :baseDate', {baseDate})
        .skip((page - 1) * limit)
        .take(limit)
        .getMany();
    return {data:stories, page: page, totalPage: Math.ceil(total/limit), limit: limit}
  }
}
