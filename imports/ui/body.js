"use strict";

import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tasks } from '../api/tasks';
import './body.html';
import './task.js';

Template.body.onCreated(function onBodyCreated() {
	this.state = new ReactiveDict();
});

Template.body.helpers({
	tasks() {
		const instance = Template.instance();
		if (instance.state.get('hideCompleted')) {
			return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
		} else {
			return Tasks.find({}, {sort: {createdAt: -1}});
		}
	},

	incompleteCount() {
		return Tasks.find({checked: {$ne: true}}).count();
	},
});

Template.body.events({
	'submit .js-add-new-task'(event) {
		event.preventDefault();
		const target = event.target;
		const text = target.text.value;

		Tasks.insert({
			text: text,
			createdAt: new Date(),
			checked: false,
			owner: Meteor.userId(),
			username: Meteor.user().username,
		});

		target.text.value = "";
	},

	'change .js-hide-completed'(event, instance) {
		instance.state.set('hideCompleted', event.target.checked);
	},
});
