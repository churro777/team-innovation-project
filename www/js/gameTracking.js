//"categories": [new Category("vehicle", 10), new Category("property", 10), new Category("family", 10),
//                   new Category("finances", 10), new Category("job", 10), new Category("vacation", 10)]

// Category class
// stores a category's name, total pages visited, what those pages are
function Category(name, totalPages) {
    this.name = name;
    this.totalPages = totalPages;
    this.pagesVisitedSoFar = 0;
    this.pagesVisited = [];
}

// get the category from data based off the name
function getCategoryObject(categoryName) {
    var data  = JSON.parse(localStorage.data);
    for (i = 0; i < 6; i++) {
        if (data.categories[i].name == categoryName) {
            return data.categories[i];
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

// will only fire on the content pages
function visitCategoryPage(categoryName, page) {
    var category = getCategoryObject(categoryName);
    
    console.log(typeof category)
    console.log(category)

    if (!doesCategoryContainsPage(category.pagesVisited, page)) {
        category.pagesVisitedSoFar++;
        category.pagesVisited.push(page);
    }
    
    // save the change
    console.log(category)
    console.log("saving category")
    var data = JSON.parse(localStorage.data)
    console.log("old data")
    console.log(data)
    
    console.log("categoryName: " + categoryName)
    
    for(i = 0; i < 6; i++){
        if(data.categories[i].categoryName == categoryName){
            data.categories[i] = category;
            console.log("new category set")
        }
    }
    console.log("new data")
    console.log(data)
    
    localStorage.setItem("data", JSON.stringify(data));
    
    visited(page);
}