"use strict";

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
	Meteor.publish('tasks', function tasksPublication () {
		return Tasks.find();
	});
}

Meteor.methods({
	'tasks.insert'(text) {
		check(text, String);
		// ensure user is logged in
		if (! this.userId) {
			throw new Meteor.Error('Not authorized.');
		}

		Tasks.insert({
			text,
			createdAt: new Date(),
			checked: false,
			owner: this.userId,
			username: Meteor.user().username,
		});
	},

	'tasks.remove'(taskId) {
		check(taskId, String);
		Tasks.remove(taskId);
	},

	'tasks.setChecked'(taskId, setChecked) {
		check(taskId, String);
		check(setChecked, Boolean);
		Tasks.update({taskId}, {$set: {checked: setChecked}});
	},
});
