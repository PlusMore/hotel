Template.orderHistoryTypeCell.helpers({
	friendlyOrderType: function() {
    return HotelServices.friendlyServiceType(this.service.type);
  }
});

Template.orderHistoryRequestedDateCell.helpers({
  orderRequestedDate: function() {
  	var when = moment(this.requestedDate).zone(this.requestedZone);
    return when.format('MMMM Do YYYY, h:mm a');
  } 
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
	orderClosedDate: function() {
		if (this.cancelledDate) {
		var when = moment(this.cancelledDate).zone(this.requestedZone);
	}
		var when = moment(this.completedDate).zone(this.requestedZone);
	  return when.format('MMMM Do YYYY, h:mm a');
	}
});
