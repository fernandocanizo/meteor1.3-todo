"use strict";

import { Template } from 'meteor/templating';
import './body.html';
import { Tasks } from '../api/tasks';

Template.body.helpers({
	tasks() {
		return Tasks.find({}, {sort: {createdAt: -1}});
	},
});
