getRandomCharts = (min, max, count) ->
    charts = [chart for chart in CHARTS when min <= chart.rating <= max and chart.style == 'Single']
    charts = random_items charts, count
    Ember.A [Ember.Object.create(obj) for obj in charts]

PICK_STATES = [
    ['one', 'downvote']
    ['two', 'downvote']
    ['two', 'upvote']
    ['one', 'upvote']
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
        chart = this.get 'chart'
        if pickingController.get('isPickingPhase') and not chart.get('player')
            currentState = pickingController.get 'currentState'
            chart.set 'player' currentState[0]
            chart.set 'action' currentState[1]
            pickingController.nextState!

    isCurrentlyDrawnChart: (->
        pickingController = this.get 'pickingController'
        chart = this.get 'chart'
        pickingController.get('currentlyDrawnChart') == chart
    ).property('pickingController.currentlyDrawnChart')
}

App.SettingsController = Ember.Controller.extend {
    playerOneName: 'Player 1'
    playerTwoName: 'Player 2'
    minimumRating: '9'
    maximumRating: '11'
    numberOfCharts: '5'

    goToPicking: ->
        pickingController = this.controllerFor 'picking'
        pickingController.set 'playerOneName' this.get('playerOneName')
        pickingController.set 'playerTwoName' this.get('playerTwoName')
        pickingController.set 'currentStateIndex' 0
        pickingController.set 'currentlyDrawnChart' null
        pickingController.set 'phase' 'picking'
        charts = getRandomCharts this.get('minimumRating'), this.get('maximumRating'), this.get('numberOfCharts')
        pickingController.set 'charts' charts
        this.transitionTo 'picking'
}

App.PickingController = Ember.Controller.extend {
    playerOneName: null
    playerTwoName: null
    charts: null
    phase: 'picking'
    currentStateIndex: 0
    currentlyDrawnChart: null

    currentState: (->
        PICK_STATES[this.get 'currentStateIndex']).property('currentStateIndex')

    isPickingPhase: (->
        this.get('phase') == 'picking').property('phase')

    isRandomPhase: (->
        this.get('phase') == 'random').property('phase')

    isPlayerOneTurn: (->
        this.get('currentState')[0] == 'one' and this.get('isPickingPhase')).property('currentState', 'isPickingPhase')

    isPlayerTwoTurn: (->
        this.get('currentState')[0] == 'two' and this.get('isPickingPhase')).property('currentState', 'isPickingPhase')

    isUpvoteTurn: (->
        this.get('currentState')[1] == 'upvote').property('currentState')

    isDownvoteTurn: (->
        this.get('currentState')[1] == 'downvote').property('currentState')

    nextState: ->
        if this.get('currentStateIndex') >= PICK_STATES.length - 1
            this.set 'phase' 'random'
        else
            this.set('currentStateIndex', this.get('currentStateIndex') + 1)

    nextRandomChart: ->
        chartsLeft = [chart for chart in this.get('charts') when not chart.drawn]
        if chartsLeft.length == 0
            return
        randomChart = random_items(chartsLeft, 1)[0]
        randomChart.set('drawn', true)
        this.set('currentlyDrawnChart', randomChart)
}
