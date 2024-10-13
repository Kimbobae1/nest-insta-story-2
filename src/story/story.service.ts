import { Injectable } from '@nestjs/common';
import { CreateStoryDto } from './dto/create-story.dto';
import {Story} from "./entities/story.entity";
import {MoreThan} from "typeorm";

@Injectable()
export class StoryService {
  create(createStoryDto: CreateStoryDto) {
    const storyEntity = new Story();
    storyEntity.title = createStoryDto.title;
    storyEntity.author = createStoryDto.author;
    storyEntity.image = createStoryDto.image;
    storyEntity.hashtags = createStoryDto.hashtags;
    storyEntity.validTime = createStoryDto.validTime;
    storyEntity.createdAt = new Date();
    return storyEntity.save();
  }

  findAll() {
    const baseDate = new Date();
    baseDate.setHours(baseDate.getHours() - 12);
    return Story.findBy({
        createdAt : MoreThan(baseDate)
    });
  }
}
