"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FakeCarImagesRepository = void 0;

var _CarImage = require("../../infra/typeorm/entities/CarImage");

class FakeCarImagesRepository {
  constructor() {
    this.carimages = [];
  }

  async create(car_id, images_name) {
    const images = images_name.map(name => {
      const image = new _CarImage.CarImage();
      Object.assign(image, {
        car_id,
        name,
        created_at: new Date()
      });
      return image;
    });
    this.carimages.push(...images);
    return images;
  }

}

exports.FakeCarImagesRepository = FakeCarImagesRepository;