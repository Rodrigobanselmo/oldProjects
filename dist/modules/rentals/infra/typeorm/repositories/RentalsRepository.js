"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RentalsRepository = void 0;

var _typeorm = require("typeorm");

var _Rental = require("../entities/Rental");

class RentalsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Rental.Rental);
  }

  async create({
    car_id,
    return_date,
    total,
    user_id
  }) {
    const rental = this.repository.create({
      car_id,
      return_date,
      total,
      user_id
    });
    await this.repository.save(rental);
    return rental;
  }

  async findOpenRentalByCar(car_id) {
    const rental = await this.repository.findOne({
      car_id,
      end_date: (0, _typeorm.IsNull)()
    });
    return rental;
  }

  async findOpenRentalByUser(user_id) {
    const rental = await this.repository.findOne({
      user_id,
      end_date: (0, _typeorm.IsNull)()
    });
    return rental;
  }

  async findById(id) {
    const rental = await this.repository.findOne(id);
    return rental;
  }

  async findByUserId(id) {
    const rentals = await this.repository.find({
      where: {
        user_id: id
      },
      relations: ['car']
    });
    return rentals;
  }

  async save(rental) {
    const updatedRental = await this.repository.save(rental);
    return updatedRental;
  }

}

exports.RentalsRepository = RentalsRepository;