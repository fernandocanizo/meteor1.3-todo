"use strict";

import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks';
import './body.html';
import './task.js';

Template.body.helpers({
	tasks() {
		return Tasks.find({}, {sort: {createdAt: -1}});
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
		});

		target.text.value = "";
	},
});
