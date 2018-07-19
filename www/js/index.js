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
// Category class
// stores a category's name, total pages visited, what those pages are
function Category(name, totalPages) {
    this.name = name;
    this.totalPages = totalPages;
    this.pagesVisitedSoFar = 0;
    this.pagesVisited = [];

    this.addPage = function (page) {
        this.pagesVisited.push(page);
        this.pagesVisitedSoFar = this.pagesVisitedSoFar + 1;
    }
}

// data holds all data from the user
data = {
    "pagesVisited": [],
    "categories": [new Category("vehicle", 10), new Category("property", 10), new Category("family", 10),
                   new Category("finances", 10), new Category("job", 10), new Category("vacation", 10)]
};



// will fire at teh begining of every page
function visited(page) {
    var visit = new PageVisit(page, new Date);
    localStorage.data.pagesVisited.push(visit);
}

// will only fire on the content pages
function visitCategoryPage(categoryName, page) {
    var category = getCategoryObject(categoryName);

    if (!doesCategoryContainsPage(category.pagesVisited, page)) {
        category.addPage(page);
    }

}

// get the category from data based off the name
function getCategoryObject(categoryname) {
    for (i = 0; i < 6; i++) {
        if (localStorage.data.categories[i].name == categoryName) {
            return localStorage.data.categories[i];
        }
    }
}

// check if the page is already in the visted page list
function doesCategoryContainsPage(pageList, page) {
    for (i = 0; i < pageList.size; i++) {
        if (pageList[i] == page) {
            return true;
        }
    }

    return false;
}

function isPageActuallyRead(categoryName, page, seconds) {
    setTimeout(visitCategoryPage(categoryName, page), (seconds * 1000));
}

function startTracking() {
    console.log("tracking started");
    // save the data on the device
    localStorage.setItem("data", data);
    visited("index");
}
