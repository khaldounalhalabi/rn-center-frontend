import { BaseService } from "@/services/BaseService";
import {Medicines} from "@/Models/Medicines";

export class MedicinesService extends BaseService<Medicines> {
    public getBaseUrl(): string {
        return `${this.actor}/medicines`;
    }
}
