package com.wms.wms_server.testweb;

import static org.assertj.core.api.Assertions.assertThat;

import com.wms.wms_server.controllers.ItemInfoAndBarcodeController;
import com.wms.wms_server.controllers.LocationController;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class SmokeTest {
    @Autowired
    LocationController locationController;
    @Autowired
    ItemInfoAndBarcodeController ItemInfoAndBarcodeController;

    @Test
    public void controllerLoads() throws Exception {
        assertThat(locationController).isNotNull();
        assertThat(ItemInfoAndBarcodeController).isNotNull();
    }
}
