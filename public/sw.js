function send_message_to_all_clients(msg){
    clients.matchAll().then(clients => {
        clients.forEach(client => {
            send_message_to_client(client, msg).then(m => console.log("SW Received Message: "+m));
        })
    })
}

var timer = null;

function send_message_to_client(client, msg){
    return new Promise(function(resolve, reject){
        var msg_chan = new MessageChannel();

        msg_chan.port1.onmessage = function(event){
            if(event.data.error){
                reject(event.data.error);
            }else{
                resolve(event.data);
            }
        };

        client.postMessage(msg, [msg_chan.port2]);
    });
}

console.log('Started', self);
self.addEventListener('install', function(event) {
  // self.skipWaiting();
  console.log('Installed', event);
});
self.addEventListener('activate', function(event) {
  console.log('Activated', event);
});
self.addEventListener('push', function(event) {

  var title = 'Weather Alert';  
  var body = 'The weather might be acting up today ...';  
  var icon = 'https://fir-messaging-cebad.firebaseapp.com/logo.png';  
  var tag = 'alert';

  if(timer) clearTimeout(timer);
  /*timer = setTimeout(function() {

    self.registration.showNotification('Example of pulling your attention', {  

      body: 'Just a quick example how these notifications can ping you',  
      icon: '',  
      tag:  'wakeup'  

    });

  }, 1000 * 60 * 6);*/

  event.waitUntil(self.registration.showNotification(title, {  
    body: body,  
    icon: icon,  
    tag: tag  
  }));

});

self.addEventListener('notificationclick', function(event) {  

  // Android doesn't close the notification when you click on it  
  // See: http://crbug.com/463146  
  event.notification.close();

  event.waitUntil(
        clients.matchAll({
            type: 'window'
        })
        .then(function(windowClients) {
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow('https://fir-messaging-cebad.firebaseapp.com/view.html');
            }
        })
    );

});