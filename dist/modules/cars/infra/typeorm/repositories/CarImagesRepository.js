"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarImagesRepository = void 0;

var _typeorm = require("typeorm");

var _CarImage = require("../entities/CarImage");

class CarImagesRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_CarImage.CarImage);
  }

  async create(car_id, images_name) {
    const imagesObj = images_name.map(name => {
      const image = this.repository.create({
        car_id,
        image_name: name
      });
      return image;
    });
    const images = await this.repository.save(imagesObj);
    return images;
  }

}

exports.CarImagesRepository = CarImagesRepository;