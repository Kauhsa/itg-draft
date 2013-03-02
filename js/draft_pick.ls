getRandomCharts = (min, max, count) ->
    charts = [chart for chart in CHARTDATA.charts when min <= chart.rating <= max]
    charts = random_items charts, count
    Ember.A [Ember.Object.create(obj) for obj in charts]

PICK_STATES = [
    ['one', 'ban']
    ['two', 'ban']
    ['two', 'favor']
    ['one', 'favor']
]

window.App = Ember.Application.create!

App.Router.map ->
    this.route 'settings' {path: '/'}
    this.resource 'picking' {path: '/pick'}

App.ChartView = Ember.View.extend {
    chart: null
    pickingController: null
    clickChart: ->
        pickingController = this.get 'pickingController'
        chart = this.get('chart')
        currentState = pickingController.get 'currentState'
        if not chart.get 'player'
            chart.set 'player' currentState[0]
            chart.set 'action' currentState[1]
            pickingController.nextState!
}

App.SettingsController = Ember.Controller.extend {
    playerOneName: ''
    playerTwoName: ''
    minimumRating: ''
    maximumRating: ''
    numberOfCharts: '5'

    goToPicking: ->
        pickingController = this.controllerFor 'picking'
        pickingController.set 'playerOneName' this.get('playerOneName')
        pickingController.set 'playerTwoName' this.get('playerTwoName')
        pickingController.set 'currentStateIndex' 0
        charts = getRandomCharts this.get('minimumRating'), this.get('maximumRating'), this.get('numberOfCharts')
        pickingController.set 'charts' charts
        this.transitionTo 'picking'
}

App.PickingController = Ember.Controller.extend {
    playerOneName: null
    playerTwoName: null
    charts: null
    currentStateIndex: 0
    currentState: (->
        PICK_STATES[this.get 'currentStateIndex']).property('currentStateIndex')
    isPlayerOneTurn: (->
        this.get('currentState')[0] == 'one').property('currentState')
    isPlayerTwoTurn: (->
        this.get('currentState')[0] == 'two').property('currentState')
    nextState: ->
        this.set('currentStateIndex', this.get('currentStateIndex') + 1)
}
