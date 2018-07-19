/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

//////////////////////////////////////////////////////////////////////////

// PageVisit class
// stores a file path and a time stamp on when user visited page
function PageVisit(page, time) {
    this.page = page;
    this.time = time;
}

// data holds all data from the user
data = {
    "pagesVisited": []
};

// will fire at teh begining of every page
function visited(page) {
    var visit = new PageVisit(page, new Date);
    var data = JSON.parse(localStorage.data);
    data.pagesVisited.push(visit);
    localStorage.setItem("data", JSON.stringify(data));

    console.log(page + " was visited")
    console.log(JSON.parse(localStorage.data))
}

function startTracking() {
    console.log("tracking started");
    // save the data on the device
    if (localStorage.data == null) {
        localStorage.setItem("data", JSON.stringify(data));
    }
    console.log("data object set");
    console.log(JSON.parse(localStorage.data))
    visited("index");
}

function feelingLucky() {
    visited("index/feeling-lucky");

    var sites = [
"https://mobile.usaa.com/inet/ent_mobile_storefront/StoreFrontApp/SubProductDetailPage?key=insurance-mobile-phone-protection-product",
"https://mobile.usaa.com/inet/ent_mobile_storefront/StoreFrontApp/SubProductDetailPage?key=shopping-discounts-mobile-contractor-connection-product&wa_ref=asc_mobileSD_HIN",
"https://mobile.usaa.com/inet/wc/insurance-mobile-homeowners-product",
"https://mobile.usaa.com/inet/wc/insurance-mobile-flood-product",
"https://mobile.usaa.com/inet/wc/bank-real-estate-mortgage-loans",
"https://mobile.usaa.com/inet/wc/insurance-home-valuable-personal-property",
"https://mobile.usaa.com/inet/wc/insurance-mobile-life-product",
"https://mobile.usaa.com/inet/wc/banking-mobile-creditcheck-id-monitoring-product",
"https://mobile.usaa.com/inet/ent_mobile_storefront/StoreFrontApp/SubProductDetailPage?key=insurance-mobile-umbrella-insurance-main",
"https://mobile.usaa.com/inet/wc/shopping-discounts-mobile-adt-product?wa_ref=asc_mobileSD_adt",
"https://mobile.usaa.com/inet/wc/shopping-discount-mobile-pods-main?wa_ref=asc_mobileSD_PODS"
]
    var amountOfSites = sites.length;
    var randomPage = Math.floor(Math.random() * amountOfSites);
    window.open(sites[randomPage], "_self");
}
