var getRandomCharts, PICK_STATES;
getRandomCharts = function(min, max, count){
  var charts, res$, i$, ref$, len$, chart, ref1$, obj;
  res$ = [];
  for (i$ = 0, len$ = (ref$ = CHARTS).length; i$ < len$; ++i$) {
    chart = ref$[i$];
    if ((min <= (ref1$ = chart.rating) && ref1$ <= max) && chart.style === 'Single') {
      res$.push(chart);
    }
  }
  charts = res$;
  charts = random_items(charts, count);
  return Ember.A((function(){
    var i$, ref$, len$, results$ = [];
    for (i$ = 0, len$ = (ref$ = charts).length; i$ < len$; ++i$) {
      obj = ref$[i$];
      results$.push(Ember.Object.create(obj));
    }
    return results$;
  }()));
};
PICK_STATES = [['one', 'downvote'], ['two', 'downvote'], ['two', 'upvote'], ['one', 'upvote']];
window.App = Ember.Application.create();
App.Router.map(function(){
  this.route('settings', {
    path: '/'
  });
  return this.resource('picking', {
    path: 'pick/:player_one/:player_two/:min/:max/:count'
  });
});
App.PickingRoute = Ember.Route.extend({
  model: function(params){
    return params;
  },
  serialize: function(model){
    return model;
  },
  setupController: function(controller, model){
    controller.set('playerOneName', model.player_one);
    controller.set('playerTwoName', model.player_two);
    controller.set('currentStateIndex', 0);
    controller.set('currentlyDrawnChart', null);
    controller.set('phase', 'picking');
    return controller.set('charts', getRandomCharts(model.min, model.max, model.count));
  }
});
App.ChartView = Ember.View.extend({
  chart: null,
  pickingController: null,
  clickChart: function(){
    var pickingController, chart, currentState;
    pickingController = this.get('pickingController');
    chart = this.get('chart');
    if (pickingController.get('isPickingPhase') && !chart.get('player')) {
      currentState = pickingController.get('currentState');
      chart.set('player', currentState[0]);
      chart.set('action', currentState[1]);
      return pickingController.nextState();
    }
  },
  isCurrentlyDrawnChart: function(){
    var pickingController, chart;
    pickingController = this.get('pickingController');
    chart = this.get('chart');
    return pickingController.get('currentlyDrawnChart') === chart;
  }.property('pickingController.currentlyDrawnChart')
});
App.SettingsController = Ember.Controller.extend({
  playerOneName: 'Player 1',
  playerTwoName: 'Player 2',
  minimumRating: '9',
  maximumRating: '11',
  numberOfCharts: '5',
  pickingModel: function(){
    return {
      'player_one': this.get('playerOneName'),
      'player_two': this.get('playerTwoName'),
      'min': this.get('minimumRating'),
      'max': this.get('maximumRating'),
      'count': this.get('numberOfCharts')
    };
  }.property('playerOneName', 'playerTwoName', 'minimumRating', 'maximumRating', 'numberOfCharts'),
  goToPicking: function(){
    return this.transitionTo('picking', this.get('pickingModel'));
  }
});
App.PickingController = Ember.Controller.extend({
  playerOneName: null,
  playerTwoName: null,
  charts: null,
  phase: 'picking',
  currentStateIndex: 0,
  currentlyDrawnChart: null,
  currentState: function(){
    return PICK_STATES[this.get('currentStateIndex')];
  }.property('currentStateIndex'),
  isPickingPhase: function(){
    return this.get('phase') === 'picking';
  }.property('phase'),
  isRandomPhase: function(){
    return this.get('phase') === 'random';
  }.property('phase'),
  isPlayerOneTurn: function(){
    return this.get('currentState')[0] === 'one' && this.get('isPickingPhase');
  }.property('currentState', 'isPickingPhase'),
  isPlayerTwoTurn: function(){
    return this.get('currentState')[0] === 'two' && this.get('isPickingPhase');
  }.property('currentState', 'isPickingPhase'),
  isUpvoteTurn: function(){
    return this.get('currentState')[1] === 'upvote';
  }.property('currentState'),
  isDownvoteTurn: function(){
    return this.get('currentState')[1] === 'downvote';
  }.property('currentState'),
  nextState: function(){
    if (this.get('currentStateIndex') >= PICK_STATES.length - 1) {
      return this.set('phase', 'random');
    } else {
      return this.set('currentStateIndex', this.get('currentStateIndex') + 1);
    }
  },
  nextRandomChart: function(){
    var chartsLeft, res$, i$, ref$, len$, chart, randomChart;
    res$ = [];
    for (i$ = 0, len$ = (ref$ = this.get('charts')).length; i$ < len$; ++i$) {
      chart = ref$[i$];
      if (!chart.drawn) {
        res$.push(chart);
      }
    }
    chartsLeft = res$;
    if (chartsLeft.length === 0) {
      return;
    }
    randomChart = random_items(chartsLeft, 1)[0];
    randomChart.set('drawn', true);
    return this.set('currentlyDrawnChart', randomChart);
  }
});