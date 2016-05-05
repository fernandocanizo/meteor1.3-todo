"use strict";

import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
	// only publish tasks public or belonging to this user
	Meteor.publish('tasks', function tasksPublication () {
		return Tasks.find({$or: [
			{isPrivate: false},
			{owner: this.userId}
		]});
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
			isPrivate: false,
		});
	},

	'tasks.remove'(taskId) {
		check(taskId, String);
		const task = Tasks.findOne({_id: taskId});
		if (task.isPrivate || task.owner !== this.userId) {
			throw new Meteor.Error("Not authorized to delete this task.");
		}
		Tasks.remove(taskId);
	},

	'tasks.setChecked'(taskId, setChecked) {
		check(taskId, String);
		check(setChecked, Boolean);
		const task = Tasks.findOne({_id: taskId});
		if (task.isPrivate && task.owner !== this.userId) {
			throw new Meteor.Error("Not authorized to delete this task.");
		}
		Tasks.update({taskId}, {$set: {checked: setChecked}});
	},

	'tasks.setPrivate'(taskId, setToPrivate) {
		check(taskId, String);
		check(setToPrivate, Boolean);
		const task = Tasks.findOne({_id: taskId});
		// ensure user has access
		if (task.owner !== this.userId) {
			throw new Meteor.Error("Not authorized to set private flag.");
		}
		Tasks.update({_id: taskId}, {$set: {isPrivate: setToPrivate}});
	},
});
