import { BaseService } from "@/services/BaseService";
import { BlockedItem } from "@/Models/BlockedItem";

export class BlockedItemService extends BaseService<
  BlockedItemService,
  BlockedItem
>() {
  public getBaseUrl(): string {
    return `${this.role}/blocked-items`;
  }
}
