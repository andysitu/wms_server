package com.wms.wms_server.services.items;

import com.wms.wms_server.model.items.ItemInfo;
import com.wms.wms_server.model.items.ItemSku;
import com.wms.wms_server.repository.items.ItemSkuRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ItemSkuService {
    @Autowired
    ItemSkuRepository itemSkuRepository;

    /**
     * Checks if an ItemSku exists by the String SKU, which is unique
     * @param sku String item SKU
     * @return True if it does; false it does not
     */
    public boolean checkIfSkuExists(String sku) {
        List<ItemSku> skus = itemSkuRepository.findBySku(sku);
        return !skus.isEmpty();
    }

    /***
     * Creates ItemSku, saves it to the repository, and returns it.
     * @param sku String of item sku
     * @param itemInfo ItemInfo that the ItemSku will be assigned to
     * @return ItemSku created
     */
    public ItemSku createItemSku(String sku, ItemInfo itemInfo) {
        ItemSku itemSku = new ItemSku(sku, itemInfo);
        itemSkuRepository.save(itemSku);
        return itemSku;
    }
}
