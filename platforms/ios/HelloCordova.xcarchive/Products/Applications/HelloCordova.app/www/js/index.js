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


function PageVisit(page, time) {
    this.page = page;
    this.time = time;
}

function Category(name, totalPages) {
    this.name = name;
    this.totalPages = totalPages;
    this.pagesVisitedSoFar = 0;
    this.pagesVisited = [];
    
    this.addPage = function (page) {
        this.pagesVisited.push(page);
    }
    
    this.pageWasVisited = function() {
        this.pagesVisitedSoFar = this.pagesVisitedSoFar + 1;
    }
    
}

dataTracking = {"pagesVisited":[], "categories":[new Category("vehicle",10)]};

localStorage.setItem("data", dataTracking);



function visited(page){
    var visit = new PageVisit(page, new Date);
    localStorage.data.pagesVisited.push(visit);
}




