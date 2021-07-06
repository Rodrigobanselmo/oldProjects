"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FakeCarsRepository = void 0;

var _Car = require("../../infra/typeorm/entities/Car");

class FakeCarsRepository {
  constructor() {
    this.cars = [];
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
    const car = new _Car.Car();
    Object.assign(car, {
      name,
      description,
      brand,
      license_plate,
      daily_rate,
      fine_amount,
      category_id,
      created_at: new Date(),
      available: true
    });
    this.cars.push(car);
    return car;
  }

  async findByLicensePlate(license_plate) {
    const car = this.cars.find(car => car.license_plate === license_plate);
    return car;
  }

  async findById(id) {
    const car = this.cars.find(car => car.id === id);
    return car;
  }

  async listAllCars() {
    return this.cars;
  }

  async findAvailables({
    brand,
    category_id,
    name
  }) {
    let all = this.cars.filter(car => car.available === true);

    if (brand) {
      all = all.filter(car => car.brand === brand);
    }

    if (category_id) {
      all = all.filter(car => car.category_id === category_id);
    }

    if (name) {
      all = all.filter(car => car.name === name);
    }

    return all;
  }

  async save(car) {
    const indexCar = this.cars.findIndex(carFind => carFind.id === car.id);
    this.cars.splice(indexCar, 1, car);
    return car;
  }

  async updateAvailable(id, available) {
    const indexCar = this.cars.findIndex(carFind => carFind.id === id);
    const car = { ...this.cars[indexCar],
      available
    };
    this.cars.splice(indexCar, 1, car);
  }

}

exports.FakeCarsRepository = FakeCarsRepository;