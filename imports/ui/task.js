"use strict";

import { Template } from 'meteor/templating';
import { Tasks} from '../api/tasks';
import './task.html';

Template.task.events({
	"click .js-toggle-checked"() {
		Tasks.update(this._id, {$set: {checked: ! this.checked}});
	},

	"click .js-delete"() {
		Tasks.remove(this._id);
	},
});
