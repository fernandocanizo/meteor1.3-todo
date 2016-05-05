"use strict";

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Tasks} from '../api/tasks';
import './task.html';

Template.task.events({
	"click .js-toggle-checked"() {
		Meteor.call('tasks.setChecked', this._id, !this.checked);
	},

	"click .js-delete"() {
		Meteor.call('tasks.remove', this._id);
	},

	"click .js-toggle-private"() {
		Meteor.call('tasks.setPrivate', this._id, ! this.isPrivate);
	},
});

Template.task.helpers({
	'isOwner'() {
		return this.owner === Meteor.userId();
	},

	'isPrivateOrPublic'() {
		return Meteor.call('tasks.isPrivateOrPublic', this._id);
	},
});
