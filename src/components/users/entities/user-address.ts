import { IAddress } from '../type';
import Entity from '../../../core';

export default function buildAddress() {
  return class UserAddress extends Entity {
    private country?: string;
    private city?: string;
    private street?: string;

    constructor(addressPayload: IAddress) {
      super();

      this.country = addressPayload.country;
      this.city = addressPayload.city;
      this.street = addressPayload.street;
    }
  };
}
