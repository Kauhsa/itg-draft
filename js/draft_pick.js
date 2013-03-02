var getRandomCharts, PICK_STATES;
getRandomCharts = function(min, max, count){
  var charts, res$, i$, ref$, len$, chart, ref1$, obj;
  res$ = [];
  for (i$ = 0, len$ = (ref$ = CHARTDATA.charts).length; i$ < len$; ++i$) {
    chart = ref$[i$];
    if ((min <= (ref1$ = chart.rating) && ref1$ <= max) && chart.style === 0) {
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
    path: '/pick'
  });
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
  goToPicking: function(){
    var pickingController, charts;
    pickingController = this.controllerFor('picking');
    pickingController.set('playerOneName', this.get('playerOneName'));
    pickingController.set('playerTwoName', this.get('playerTwoName'));
    pickingController.set('currentStateIndex', 0);
    pickingController.set('currentlyDrawnChart', null);
    pickingController.set('phase', 'picking');
    charts = getRandomCharts(this.get('minimumRating'), this.get('maximumRating'), this.get('numberOfCharts'));
    pickingController.set('charts', charts);
    return this.transitionTo('picking');
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