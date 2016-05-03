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
});
