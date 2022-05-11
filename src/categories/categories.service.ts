import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { initialCategories } from './categories.consts';
import { CreateCategoryDto, UpdateCategoryDto } from './categories.dto';
import { Category } from './categories.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async init() {
    await this.categoriesRepository.save(initialCategories);
    console.log('CATEGORIES INITIALED');
  }

  async create(dto: CreateCategoryDto) {
    const category = this.categoriesRepository.create(dto);
    return await this.categoriesRepository.save(category);
  }

  async getAll() {
    return await this.categoriesRepository.find();
  }

  async getById(id: number) {
    return await this.categoriesRepository.findOne(id);
  }

  async update(id: number, dto: UpdateCategoryDto) {
    return await this.categoriesRepository.save({ id, ...dto });
  }

  async delete(id: number) {
    return await this.categoriesRepository.delete(id);
  }
}
