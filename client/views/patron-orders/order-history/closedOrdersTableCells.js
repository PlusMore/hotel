Template.orderHistoryTypeCell.helpers({
	friendlyOrderType: function() {
    return HotelServices.friendlyServiceType(this.service.type);
  }
});

Template.orderHistoryRequestedDateCell.helpers({

});

Template.orderHistoryStatusCell.helpers({
	orderStatus: function() {
		if (this.status == 'completed'){
			return "Completed";
		} else if (this.status == 'cancelled'){
			return "Cancelled";
		}
	}
});

Template.orderHistoryClosedDateCell.helpers({

});

Template.orderHistoryViewOrderCell.events({

});