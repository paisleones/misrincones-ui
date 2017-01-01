function drawInfobox(category, infoboxContent, json, i) {

    if (json.data[i].color) {
        var color = json.data[i].color
    } else {
        color = ''
    }
    if (json.data[i].price) {
        var price = '<div class="price">' + json.data[i].price + '</div>'
    } else {
        price = ''
    }
    if (json.data[i].id) {
        var id = json.data[i].id
    } else {
        id = ''
    }
    if (json.data[i].url) {
        var url = json.data[i].url
    } else {
        url = ''
    }
    if (json.data[i].type) {
        var type = json.data[i].type
    } else {
        type = ''
    }
    if (json.data[i].title) {
        var title = json.data[i].title
    } else {
        title = ''
    }
    if (json.data[i].rating) {
        var rating = json.data[i].rating
    } else {
        rating = ''
    }
    if (json.data[i].location) {
        var location = json.data[i].location
    } else {
        location = ''
    }
    if (json.data[i].gallery[0]) {
        var gallery = "http://misrincones.trabajocreativo.com/" + json.data[i].gallery[0]
    } else {
        gallery[0] = '../img/default-item.jpg'
    }

    var ibContent = '';
    ibContent =
            '<div class="infobox ' + color + '">' +
            '<div class="inner">' +
            '<div class="image">' +
            '<a href="#" class="quick-view" data-toggle="modal" data-target="#modal" id="' + id + '"><div class="item-specific">' + drawItemSpecific(category, json, i) + '</div>' +
            '<div class="overlay">' +
            '<div class="wrapper" style="color: #fff; margin: auto;">' +
            'DESCUBRIR ESTE RINCÓN' +
            '<hr>' +
            '</div>' +
            '</div></a>' +
            '<img src="' + gallery + '">' +
            '<a class="description">' +
            '<div class="meta">' +
            '<h2>' + title + '</h2>' +
            '<figure style="color: #a0a0a0;">' + location + '</figure>' +
            '<figure style="color: #a0a0a0;">' + type + '</figure>' +
            '<div class="rating" data-rating="' + rating + '"></div>' +
            '<i class="fa fa-angle-right"></i>' +
            '</div>' +
            '</a>' +
            '</div>' +
            '</div>' +
            '</div>';

    return ibContent;
}