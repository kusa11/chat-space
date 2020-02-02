$(function() {
  function createImage(message){
   if(message.image){
    return `<img class="lower-message__image" src='${message.image.url}'>`
   } else {
    return ``
   }
  }

  function buildHTML(message){
    var html = `<div class="message" data-id="${message.id}">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                  ${message.user_name}
                  </div>
                    <div class="message__date">
                  ${message.created_at}
                  </div>
                </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                  ${message.content}
                  </p>
                  ${createImage(message)}  
                  </div>
                </div>`
    return html
  }

  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data)
      $('.messages').append(html); 
      $('form')[0].reset();
      $('.chat_main__message-list').animate({scrollTop: $('.chat_main__message-list')[0].scrollHeight}, 1500);
    })
    .fail(function(){
      alert('メッセージを送信できません')
    })
    return false;
  })

  var reloadMessages = function() {
    last_message_id = $('.message:last').data("id");
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML= '';
        messages.forEach(function (message) {
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML); 
          $('.chat_main__message-list').animate({ scrollTop: $('.chat_main__message-list')[0].scrollHeight});
        })
      }
    })
    .fail(function() {
      alert('更新できませんでした');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});