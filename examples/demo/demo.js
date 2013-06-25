function Demo() {
    this.genres = [
        GenreFilter.create(GenreFilter.SPORTS),
        GenreFilter.create(GenreFilter.NEWS),
        GenreFilter.create(GenreFilter.EDU)
//        GenreFilter.create(GenreFilter.MOVIES),
//        GenreFilter.create(GenreFilter.COMEDY)
    ];

    this.times = [
        TimeFilter.create(TimeFilter.RIGHT_NOW),
        TimeFilter.create(TimeFilter.TONIGHT),
        TimeFilter.create(TimeFilter.THIS_SATURDAY)
    ];

    this.chosenGenre = ko.observable(this.genres[0]);
    this.chosenTime = ko.observable(this.times[0]);

    this.query = ko.computed(this.buildQuery, this).extend({ throttle: 50 });
    this.results = ko.observableArray();

    this.isBusy = ko.observable(true);

    this.query.subscribe(this.isBusy.bind(this, true));
    this.query.subscribe(this.initiateUpdate, this);
    this.results.subscribe(this.isBusy.bind(this, false));

    this.initiateUpdate();
}

Demo.prototype.buildQuery = function () {
    var genre = this.chosenGenre();
    var time = this.chosenTime();

    return [
//        '/broadcasts.json?genre=' + genre.title,
//        'start' + time.start,
//        'end' + time.end
        '<not there yet>'
    ].join('&');
};

Demo.prototype.initiateUpdate = function () {
    var self = this;
    var genre = this.chosenGenre();
    var time = this.chosenTime();
    var start = time.start;
    var end = time.end;
    var request = kraken.Broadcast.create();

    request.limit(5);
    request.filter(kraken.Broadcast.START[start.operator](start.value));
    request.filter('category=' + genre.name);
    request.filter(kraken.Broadcast.END[end.operator](end.value));
    request.fields(kraken.Broadcast.TITLE, kraken.Broadcast.START, kraken.Broadcast.SYNOPSIS, 'channel.name');

    request.findOne(function (response) {
        self.results(ko.utils.arrayMap(response, function (item) {
            return {
                title: item.title,
                channel: item.channel.name,
                time: moment(item.start).format('HH:mm'),
                synopsis: item.synopsis
            };
        }));
    });
};


function GenreFilter(name, title) {
    this.name = name;
    this.title = title;
}

GenreFilter.EDU = 'education';
GenreFilter.NEWS = 'news';
GenreFilter.SPORTS = 'sports';
GenreFilter.MOVIES = 'movies';
GenreFilter.COMEDY = 'comedy';

GenreFilter.create = function (title) {
    var name;

    switch (title) {
        case GenreFilter.EDU:
            name = 'educatie';
            break;

        case GenreFilter.NEWS:
            name = 'nieuws';
            break;

        case GenreFilter.SPORTS:
            name = 'sport';
            break;
    }

    return new GenreFilter(name, title);
};


function TimeFilter(title, start, end) {
    this.title = title;
    this.start = start;
    this.end = end;
}

TimeFilter.RIGHT_NOW = 'right now';
TimeFilter.TONIGHT = 'tonight';
TimeFilter.THIS_SATURDAY = 'this Saturday';

TimeFilter.create = function (title) {
    var start;
    var end;
    var format = 'YYYY-MM-DDTHH:mm';
    var now = moment().utc().format(format);

    switch (title) {
        case TimeFilter.RIGHT_NOW:
            start = {
                operator: 'lessThanOrEqualTo',
                value: now + 'Z'
            };
            end = {
                operator: 'greaterThanOrEqualTo',
                value: now + 'Z'
            };
            break;

        case TimeFilter.TONIGHT:
            start = {
                operator: 'greaterThanOrEqualTo',
                value: moment().startOf('day').hours(18).utc().format(format) + 'Z'
            };
            end = {
                operator: 'lessThanOrEqualTo',
                value: moment().endOf('day').utc().format(format) + 'Z'
            };
            break;

        case TimeFilter.THIS_SATURDAY:
            start = {
                operator: 'greaterThanOrEqualTo',
                value: moment().days(6).startOf('day').hours(15).utc().format(format) + 'Z'
            };
            end = {
                operator: 'lessThanOrEqualTo',
                value: moment().days(6).endOf('day').utc().format(format) + 'Z'
            };
            break;
    }

    return new TimeFilter(title, start, end);
};