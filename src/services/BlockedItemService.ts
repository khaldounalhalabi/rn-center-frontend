import { BaseService } from "@/services/BaseService";
import { BlockedItem } from "@/Models/BlockedItem";

export class BlockedItemService extends BaseService<BlockedItem> {
  public getBaseUrl(): string {
    return `${this.actor}/blocked-items`;
  }
}
