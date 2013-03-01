var PLAYER_ONE_NAME, PLAYER_TWO_NAME, PLAYER_ONE, PLAYER_TWO, BAN, FAVOR, STATES, current_state_index, next_state;
PLAYER_ONE_NAME = 'Kauhsa';
PLAYER_TWO_NAME = 'Rangifer';
PLAYER_ONE = 0;
PLAYER_TWO = 1;
BAN = 0;
FAVOR = 1;
STATES = [[PLAYER_ONE, BAN], [PLAYER_TWO, BAN], [PLAYER_TWO, FAVOR], [PLAYER_ONE, FAVOR]];
current_state_index = -1;
next_state = function(){
  var state, player_name, action, text;
  current_state_index += 1;
  if (current_state_index >= STATES.length) {
    $('.player_name.one').removeClass('active');
    $('.player_name.two').removeClass('active');
    $('.info_text').text('Chart selection done!');
    return;
  }
  state = STATES[current_state_index];
  if (state[0] === PLAYER_ONE) {
    $('.player_name.one').addClass('active');
    $('.player_name.two').removeClass('active');
    player_name = PLAYER_ONE_NAME;
  } else {
    $('.player_name.two').addClass('active');
    $('.player_name.one').removeClass('active');
    player_name = PLAYER_TWO_NAME;
  }
  if (state[1] === BAN) {
    action = 'ban';
  } else {
    action = 'select';
  }
  text = 'Waiting for ' + player_name + ' to ' + action + ' a chart';
  return $('.info_text').text(text);
};
$(function(){
  $('.chart').click(function(){
    var state, player_class, action_class;
    if (current_state_index >= STATES.length) {
      return;
    }
    if ($(this).hasClass('one') || $(this).hasClass('two')) {
      return;
    }
    state = STATES[current_state_index];
    if (state[0] === PLAYER_ONE) {
      player_class = 'one';
    } else {
      player_class = 'two';
    }
    if (state[1] === BAN) {
      action_class = 'ban';
    } else {
      action_class = 'favor';
    }
    $(this).addClass(player_class);
    $(this).addClass(action_class);
    return next_state();
  });
  $('.player_name.one').text(PLAYER_ONE_NAME);
  $('.player_name.two').text(PLAYER_TWO_NAME);
  return next_state();
});