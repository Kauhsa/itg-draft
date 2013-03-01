var load_template;
load_template = function(id){
  var source;
  source = $(id).html();
  return Handlebars.compile(source);
};
$(function(){
  var uniqs, settings, settings_template, chart_table_template;
  uniqs = unique_values(SONGS);
  settings = [
    {
      label: 'Packs',
      options: uniqs.pack
    }, {
      label: 'Styles',
      options: uniqs.style
    }, {
      label: 'Ratings',
      options: uniqs.rating
    }
  ];
  settings_template = load_template('#settings-template');
  $('#settings-form-container').html(settings_template({
    settings: settings
  }));
  chart_table_template = load_template('#chart-table-template');
  return $('#chart-table-container').html(chart_table_template({
    songs: SONGS
  }));
});