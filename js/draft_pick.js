var getRandomCharts, PICK_STATES;
getRandomCharts = function(min, max, count){
  var charts, res$, i$, ref$, len$, chart, ref1$, obj;
  res$ = [];
  for (i$ = 0, len$ = (ref$ = CHARTDATA.charts).length; i$ < len$; ++i$) {
    chart = ref$[i$];
    if (min <= (ref1$ = chart.rating) && ref1$ <= max) {
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
    currentState = pickingController.get('currentState');
    if (!chart.get('player')) {
      chart.set('player', currentState[0]);
      chart.set('action', currentState[1]);
      return pickingController.nextState();
    }
  }
});
App.SettingsController = Ember.Controller.extend({
  playerOneName: '',
  playerTwoName: '',
  minimumRating: '',
  maximumRating: '',
  numberOfCharts: '5',
  goToPicking: function(){
    var pickingController, charts;
    pickingController = this.controllerFor('picking');
    pickingController.set('playerOneName', this.get('playerOneName'));
    pickingController.set('playerTwoName', this.get('playerTwoName'));
    pickingController.set('currentStateIndex', 0);
    charts = getRandomCharts(this.get('minimumRating'), this.get('maximumRating'), this.get('numberOfCharts'));
    pickingController.set('charts', charts);
    return this.transitionTo('picking');
  }
});
App.PickingController = Ember.Controller.extend({
  playerOneName: null,
  playerTwoName: null,
  charts: null,
  currentStateIndex: 0,
  currentState: function(){
    return PICK_STATES[this.get('currentStateIndex')];
  }.property('currentStateIndex'),
  isPlayerOneTurn: function(){
    return this.get('currentState')[0] === 'one';
  }.property('currentState'),
  isPlayerTwoTurn: function(){
    return this.get('currentState')[0] === 'two';
  }.property('currentState'),
  isUpvoteTurn: function(){
    return this.get('currentState')[1] === 'upvote';
  }.property('currentState'),
  isDownvoteTurn: function(){
    return this.get('currentState')[1] === 'downvote';
  }.property('currentState'),
  nextState: function(){
    return this.set('currentStateIndex', this.get('currentStateIndex') + 1);
  }
});