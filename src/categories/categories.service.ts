import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './categories.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async create(dto: CreateCategoryDto) {
    const category = this.categoriesRepository.create(dto);
    await this.categoriesRepository.save(category);
    return category;
  }

  async getAll() {
    const categories = await this.categoriesRepository.find();
    return categories;
  }

  async get(id: number) {
    const category = await this.categoriesRepository.findOne(id);
    return category;
  }

  async update(id: number, dto: UpdateCategoryDto) {
    const category = await this.categoriesRepository.findOne(id);
    const updatedCategory = await this.categoriesRepository.save({
      ...category,
      ...dto,
    });
    return updatedCategory;
  }

  async delete(id: number) {
    const category = await this.categoriesRepository.findOne(id);
    const deletedCategory = await this.categoriesRepository.remove(category);
    return { ...deletedCategory, id };
  }
}
