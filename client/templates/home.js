Template.home.helpers({
	lastGames() {
		return Games.find({}, {
			sort: {
				gameDate: -1
			},
			limit: 12
		});
	},
	smallScoreGap() {
		if (this.scoreGap() === 2) {
			return true;
		} else {
			return false;
		}
	},
	bigScoreGap() {
		if (this.scoreGap() > 5) {
			return true;
		} else {
			return false;
		}
	},
	player1List() {
		var list = _.uniq(Meteor.users.find({}, {
			sort: {
				'profile.firstName': 1,
				'profile.lastName': 1
			},
			fields: {
				'_id': 1,
				'profile.firstName': 1,
				'profile.lastName': 1
			}
		}).fetch().map(function(x) {
			return x;
		}), true);
		list.sort(function(a, b) {
			if (a.fullName > b.fullName) {
				return 1;
			}
			if (a.fullName < b.fullName) {
				return -1;
			}
			return 0;
		});
		return list;
	},
	player2List() {
		var list = _.uniq(Meteor.users.find({}, {
			sort: {
				'profile.firstName': 1,
				'profile.lastName': 1
			},
			fields: {
				'_id': 1,
				'profile.firstName': 1,
				'profile.lastName': 1
			}
		}).fetch().map(function(x) {
			return x;
		}), true);
		list.sort(function(a, b) {
			if (a.fullName > b.fullName) {
				return 1;
			}
			if (a.fullName < b.fullName) {
				return -1;
			}
			return 0;
		});
		return list;
	}
});

Template.home.events({
	'click #addAGame': function(e) {
		e.preventDefault();
		if ($('#player1Name').val() === '' || $('#player2Name').val() === '') {
			console.log($('#player1Name').val(), $('#player1Score').val(), $('#player2Name').val(), $('#player2Score').val());
			return throwError("The both players are not defined !");
		} else if ($('#player1Score').val() < 10 && $('#player2Score').val() < 10) {
			console.log($('#player1Name').val(), $('#player1Score').val(), $('#player2Name').val(), $('#player2Score').val());
			return throwError("The minimum to win a game is 10 !");
		} else {
			var player1Names = $('#player1Name').val().split(' ');
			var player2Names = $('#player2Name').val().split(' ');
			var player1 = Meteor.users.findOne({ $and: [{ 'profile.firstName': player1Names[0] }, { 'profile.lastName': player1Names[1] }] });
			var player2 = Meteor.users.findOne({ $and: [{ 'profile.firstName': player2Names[0] }, { 'profile.lastName': player2Names[1] }] });
			console.log(player1, player2);
		}
	}
});
