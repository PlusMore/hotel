Template.OrderDetailsModal.helpers({
  order: function() {
    return Orders.findOne(Session.get('orderDetailsId'));
  },
  typeDetailsTemplate: function() {
    switch (this.service.type) {
      case 'transportation':
        return 'TransportationServiceDetails';
      case 'roomService':
        return 'RoomServiceDetails';
      case 'valetServices':
        return 'ValetServiceDetails';
      default:
        return 'GenericServiceDetails';
    }
  },
  statusButtonClass: function() {
    if (this.status === 'requested') {
      return 'btn btn-primary btn-claim-order';
    }
    if (this.status === 'pending') {
      return 'btn btn-success btn-complete-order';
    }
  },
  statusButtonText: function() {
    if (this.status === 'requested') {
      return 'Claim Order';
    }
    if (this.status === 'pending') {
      return 'Mark Complete';
    }
  }
});
