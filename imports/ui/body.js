"use strict";


import { Template } from 'meteor/templating';
import './body.html';

Template.body.helpers({
	tasks: [
		{ text: 'task one' },
		{ text: 'task two' },
		{ text: 'task three' },
	]
});
