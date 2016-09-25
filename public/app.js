$(document).ready(function() {

  var config = {
    apiKey: "<api-key>",
    authDomain: "<auth-domain>",
    databaseURL: "<database-url>"
  };
  firebase.initializeApp(config);

  var saveData = function(kind, uid, params) {
    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child(kind).push().key;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/' + kind + '/' + newPostKey] = params;
    return firebase.database().ref().update(updates);
  };

  /**
  * Toggle the status of the button
  **/
  var toggleSubscribeButton = function(subscribed) { 
    if(subscribed === null || subscribed === undefined) {

      $('.btn-subscribe').hide(); 
      $('.btn-unsubscribe').hide(); 

    } else if(subscribed === true) {

      $('.btn-subscribe').hide(); 
      $('.btn-unsubscribe').show(); 

    } else {

      $('.btn-subscribe').show(); 
      $('.btn-unsubscribe').hide(); 

    }
    
  };

  toggleSubscribeButton(null);

  var unsubscribe = function(worker) {

    // Do we already have a push message subscription?
    worker.pushManager.getSubscription()
      .then(function(sub) {
        
        sub.unsubscribe().then(function(event) {
          showSubscribeButtonIfRegistered(worker);
        }).catch(function(error) {
          showSubscribeButtonIfRegistered(worker);
        });

      })
      .catch(function(err) {
        console.error(err);
      });

  };

  var subscribe = function(worker) {

    worker.pushManager.subscribe({
      userVisibleOnly: true
    }).then(function(sub) {
      var endpoint = sub.endpoint;
      var uid = endpoint.slice(endpoint.lastIndexOf('/')+1);
      console.log(uid)

      saveData('subscriptions', null, {

        "uid": uid,
        "useragent": navigator.userAgent

      });

      showSubscribeButtonIfRegistered(worker);
    });

  };

  var subscribers = 0;

  var showSubscriptions = function() {

    $('.subscription-counts').show();
    $('.subscription-counts').text(subscribers);

  };

  var getSubscriberCount = function() {

    var ref = firebase.database().ref('subscriptions');
    ref.once('value', function(snapshot){

      var count = 0;
      snapshot.forEach(function() {
         count++;
      });
      subscribers = count;
      showSubscriptions();

    });

  };

  var handleSubscriberCountChange = function(data) {

    subscribers++;
    showSubscriptions();

  };

  var listenForSubscribers = function() {

    var ref = firebase.database().ref('subscriptions');
    ref.on('child_added', function(data) {
      handleSubscriberCountChange(data);
    });

  };

  listenForSubscribers();

  var showSubscribeButtonIfRegistered = function(worker) {

    // Do we already have a push message subscription?
    worker.pushManager.getSubscription()
      .then(function(subscription) {
        if(subscription) {
          toggleSubscribeButton(true);
        } else {
          toggleSubscribeButton(false);
        }
      })
      .catch(function(err) {
        console.error(err);
      });

  };

  /**
  * Register the service worker
  **/
  if ('serviceWorker' in navigator) {
   console.log('Service Worker is supported');
   navigator.serviceWorker.register('sw.js').then(function(reg) {

      $('.btn-subscribe').click(function() {

        subscribe(reg);

      });

      $('.btn-unsubscribe').click(function() {

        unsubscribe(reg);

      });

      showSubscribeButtonIfRegistered(reg);

      navigator.serviceWorker.addEventListener('message', function(data){
        $('.weather-alert').slideDown();
      });

      

   }).catch(function(err) {
    console.log('Something went wrong while trying to install the service worker')
     console.error(err);
   });
  }
  
});