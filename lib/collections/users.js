Meteor.users.helpers({
	fullName: function() {
		return this.profile.firstName + ' ' + this.profile.lastName.charAt(0) + '.';
	}
});
