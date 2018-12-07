const socket = io.connect();

(() => {
   //socket.emit('refresh game list', {});
   updateGameList();

   socket.on('refresh game list response', data => {
      updateGameList();
   });

   socket.on('join game response', data => {
      console.log("here")
      if(data.result == true){
         console.log("user joined");
          window.location.href = "game" + data.gameid;
      }else{
         console.log("error joining user to game");
          adddlert("Cannot join game!");
      }
      //Preston fill in here for response from server
   });

   function clickHandler(events) {
      console.log("IM BEING HANDLED");
      console.log ("TARGET " + event.currentTarget.id);
      console.log("clicked on join game ===============");
      event.preventDefault();
      let user_info = {
         'gameid': event.currentTarget.id
      }
      socket.emit('join game',user_info);
   }

   function updateGameList() {
      let sample_games = [{gameid: 1, gamename: "poop", num_players:3}, {gameid: 2, gamename: "poop2", num_players:4}, {gameid: 3, gamename: "poop4", num_players:6}];
      let searchelement = document.getElementsByClassName("current_games");
      console.log(JSON.stringify(searchelement));
      
      for(let i in sample_games) {
         console.log('creating game ' + sample_games[i]["gamename"]);
         let str = "<div id=game" + sample_games[i]["gameid"] + " class=\"col-md-4\">";//<a


         str += "<div style=\"border: 2px solid black\"><p style=\"margin: 0; padding: 20px\"> Join game: " + sample_games[i]["gamename"] + "</p> <h4 style=\"margin: 0; padding: 20px\">players:" + sample_games[i]["num_players"] + "</h4></a></div>";


         let node = document.createElement('div');
         node.setAttribute("id",+sample_games[i]["gameid"]);
         node.innerHTML = str;
         node.onclick = clickHandler;
         document.getElementsByClassName("current_games")[0].appendChild(node); 
      }
   }
})();