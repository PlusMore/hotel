class @HotelServicesController extends RouteController
  onBeforeAction: ->
    # do some stuff before the action is invoked

  onAfterAction: ->
    # do some stuff after the action is invoked

  yieldTemplates: 
    'hotelServicesNav': {to: 'aside'}
    