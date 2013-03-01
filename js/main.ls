load_template = (id) ->
    source = $(id).html!
    Handlebars.compile source

$ ->
    uniqs = unique_values(SONGS)
    settings =
        * label: 'Packs'
          options: uniqs.pack
        * label: 'Styles'
          options: uniqs.style
        * label: 'Ratings'
          options: uniqs.rating

    settings_template = load_template('#settings-template')
    $('#settings-form-container').html(settings_template {
        settings: settings
    })

    chart_table_template = load_template('#chart-table-template')
    $('#chart-table-container').html(chart_table_template {
        songs: SONGS
    })

