var EventCallback = Balanced.Model.extend({
	callback: Balanced.Model.belongsTo('callback', 'Balanced.Callback'),
});

export default EventCallback;