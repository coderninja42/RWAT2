if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to myApp.";
  };

  Template.messages.messages = function(){
      return Messages.find({}, {sort: {time: -1}});
  };

  Template.input.events = {
    'keydown input#message' : function(event)
    {
      if(event.which == 13)
      {
        if(Meteor.user())
          var name= Meteor.user().profile.name;
        
        else
        
        var name = 'Anonymous';
        var message = document.getElementById('message');

        if(message.value != '')
        {
          Messages.insert({

            name: name,
            message : message.value,
            time: Date.now(),

          });

          document.getElementById('message').value = '';
          message.value =''; 

        }
      }
    }
  }


  Meteor.Router.add({

    '/message' : 'messages',
    '/' : 'hello',
    '*' :'404'
  });

  Meteor.Router.filters({
    'checkedLogin' : function(page) 
    {
      if(Meteor.user())
      {
        return page; 
      }
      else
      {
        return 'hello';
      }
    }
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}




