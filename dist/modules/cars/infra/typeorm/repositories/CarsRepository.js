"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepository = void 0;

var _typeorm = require("typeorm");

var _Car = require("../entities/Car");

class CarsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Car.Car);
  }

  async create({
    name,
    description,
    brand,
    license_plate,
    daily_rate,
    fine_amount,
    category_id
  }) {
    const car = this.repository.create({
      name,
      description,
      brand,
      license_plate,
      daily_rate,
      fine_amount,
      category_id
    });
    await this.repository.save(car);
    return car;
  }

  async findByLicensePlate(license_plate) {
    const car = await this.repository.findOne({
      license_plate
    });
    return car;
  }

  async findById(id) {
    const car = await this.repository.findOne(id);
    return car;
  }

  async listAllCars() {
    const cars = await this.repository.find({
      relations: ['specifications']
    });
    return cars;
  }

  async findAvailables({
    brand,
    category_id,
    name
  }) {
    const carsQuery = this.repository.createQueryBuilder('cars').where('available = :available', {
      available: true
    });

    if (brand) {
      carsQuery.andWhere('cars.brand = :brand', {
        brand
      });
    }

    if (name) {
      carsQuery.andWhere('cars.name = :name', {
        name
      });
    }

    if (category_id) {
      carsQuery.andWhere('cars.category_id = :category_id', {
        category_id
      });
    }

    const cars = await carsQuery.getMany();
    return cars;
  }

  async save(car) {
    const updatedCar = await this.repository.save(car);
    return updatedCar;
  }

  async updateAvailable(id, available) {
    await this.repository.update(id, {
      available
    });
  }

}

exports.CarsRepository = CarsRepository;