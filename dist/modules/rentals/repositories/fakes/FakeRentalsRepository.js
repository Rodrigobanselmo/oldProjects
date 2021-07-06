"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FakeRentalsRepository = void 0;

var _Rental = require("../../infra/typeorm/entities/Rental");

class FakeRentalsRepository {
  constructor() {
    this.rentals = [];
  }

  async create({
    car_id,
    return_date,
    user_id,
    total
  }) {
    const rental = new _Rental.Rental();
    Object.assign(rental, {
      car_id,
      return_date,
      start_date: new Date(),
      user_id,
      total
    });
    this.rentals.push(rental);
    return rental;
  }

  async findOpenRentalByCar(car_id) {
    return this.rentals.find(rental => rental.car_id === car_id && !rental.end_date);
  }

  async findOpenRentalByUser(user_id) {
    return this.rentals.find(rental => rental.user_id === user_id && !rental.end_date);
  }

  async findById(id) {
    return this.rentals.find(rental => rental.id === id);
  }

  async findByUserId(id) {
    return this.rentals.filter(rental => rental.user_id === id);
  }

  async save(rental) {
    const rentalIndex = this.rentals.findIndex(rentalFind => rentalFind.id === rental.id);
    this.rentals.splice(rentalIndex, 1, rental);
    return this.rentals[rentalIndex];
  }

}

exports.FakeRentalsRepository = FakeRentalsRepository;