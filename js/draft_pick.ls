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

DOWNVOTE_WEIGHT = 1
NORMAL_WEIGHT = 4
UPVOTE_WEIGHT = 8

window.App = Ember.Application.create!

App.Router.map ->
    this.route 'settings' {path: '/'}
    this.resource 'picking' {path: 'pick/:player_one/:player_two/:min/:max/:count'}

App.PickingRoute = Ember.Route.extend {
    model: (params) ->
        params
    serialize: (model) ->
        model
    setupController: (controller, model) ->
        controller.set 'playerOneName' model.player_one
        controller.set 'playerTwoName' model.player_two
        controller.set 'currentStateIndex' 0
        controller.set 'currentlyDrawnChart' null
        controller.set 'phase' 'picking'
        controller.set 'charts' getRandomCharts model.min, model.max, model.count
}

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
    numberOfCharts: '6'

    pickingModel: (-> {
        'player_one': this.get 'playerOneName'
        'player_two': this.get 'playerTwoName'
        'min': this.get 'minimumRating'
        'max': this.get 'maximumRating'
        'count': this.get 'numberOfCharts'
    }).property('playerOneName', 'playerTwoName', 'minimumRating', 'maximumRating', 'numberOfCharts')

    goToPicking: ->
        this.transitionTo 'picking' this.get 'pickingModel'
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

        weightedChartsLeft = []
        for chart in chartsLeft
            if chart.action == 'upvote'
                weight = UPVOTE_WEIGHT
            else if chart.action == 'downvote'
                weight = DOWNVOTE_WEIGHT
            else
                weight = NORMAL_WEIGHT
            weightedChartsLeft.push {
                weight: weight
                item: chart
            }

        randomChart = weighted_random_item weightedChartsLeft
        randomChart.set 'drawn', true
        this.set 'currentlyDrawnChart', randomChart
}
